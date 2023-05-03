'use strict';



module.exports = ({ strapi }) => ({

  async listRoles({ id }) {
    let { rows } = await strapi.db.connection.raw(
      ` SELECT ar.id, a.id, a.title, pr.role_title, f.url, pl.play_role_order
        FROM play_roles_play_links pl
        JOIN play_roles pr ON pl.play_role_id=pr.id
        JOIN persons_play_roles_links ar ON ar.play_role_id=pl.play_role_id
        JOIN persons a ON a.id=ar.person_id
        JOIN files_related_morphs r ON r.related_id = a.id
        JOIN files f ON f.id = r.file_id
        WHERE r.field='cover'
        AND r.related_type = 'api::person.person'
        AND pl.play_id = ${id};`
    );

    return rows.map((row) => {
      return {
        id: row[0],
        actor_id: row[1],
        name: row[2],
        role: row[3],
        src: row[4],
        order: row[5]
      }
    })
  },
});