'use strict';



module.exports = ({ strapi }) => ({

  async listRoles(id) {
    let { rows } = await strapi.db.connection.raw(
       `SELECT ar.id, a.id as actor_id, a.title as name, pr.role_title as role, f.url as src, pl.play_role_order as order
        FROM play_roles_play_links pl
        JOIN play_roles pr ON pl.play_role_id=pr.id
        JOIN persons_play_roles_links ar ON ar.play_role_id=pl.play_role_id
        JOIN persons a ON a.id=ar.person_id
        LEFT JOIN files_related_morphs r ON (r.related_id = a.id AND r.field='cover' AND r.related_type = 'api::person.person')
        LEFT JOIN files f ON f.id = r.file_id
        WHERE pl.play_id = (select play_id from shows_play_links where show_id = ? order by id desc limit 1);`, [id]
    ).catch(err => {
      strapi.log.warn(err)
    });
    return rows
  },
});
