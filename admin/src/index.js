import { prefixPluginTranslations } from '@strapi/helper-plugin'
import pluginId from './pluginId'
import RoleSelectIcon from './components/RoleSelectIcon'
import getTrad from './utils/getTrad'

export default {
  register(app) {
    app.customFields.register({
      name: 'role-select',
      pluginId: 'role-select',
      type: 'json',
      icon: RoleSelectIcon,
      intlLabel: {
        id: getTrad('role-select.label'),
        defaultMessage: 'Role Select',
      },
      intlDescription: {
        id: getTrad('role-select.description'),
        defaultMessage: 'Select multiple options from a list',
      },
      components: {
        Input: async () => import('./components/RoleSelect'),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'form.attribute.item.requiredField.description',
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    })
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return Promise.all([import(`./translations/${locale}.json`)])
          .then(([pluginTranslations]) => {
            return {
              data: {
                ...prefixPluginTranslations(
                  pluginTranslations.default,
                  pluginId,
                ),
              },
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      }),
    )
    return Promise.resolve(importedTrads)
  },
}
