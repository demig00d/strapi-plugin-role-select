import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Select, Option } from '@strapi/design-system/Select'
import { useIntl } from 'react-intl'

const RoleSelect = ({
  value,
  onChange,
  name,
  intlLabel,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error,
}) => {
  const { formatMessage } = useIntl()

  const possibleOptions =
    [{ id: 34, actor_id: 32, name: 'Сармандеева Жанна', role: 'Канкан', src: '/uploads/Babicheva_Zhanna_76551c627a.webp', order: 13 },
    { id: 13, actor_id: 12, name: 'Тягичев Владимир', role: 'Генерал', src: '/uploads/Tyagichev_new_18bda8f157.webp', order: 9 },
    { id: 27, actor_id: 25, name: 'Евчина Евгения', role: 'Канкан', src: '/uploads/Evchina_Evgeniya_cc5e5889ec.webp', order: 13 },
    { id: 29, actor_id: 27, name: 'Иванова Марина', role: 'Канкан', src: '/uploads/Ivanova_new_fc2e9972f9.webp', order: 13 },
    { id: 82, actor_id: 17, name: 'Походня Артур', role: 'Репортеры', src: '/uploads/Pohodnya_new_8fe599d6eb.webp', order: 12 },
    { id: 20, actor_id: 17, name: 'Походня Артур', role: 'Помощник следователя', src: '/uploads/Pohodnya_new_8fe599d6eb.webp', order: 11 },
    { id: 8, actor_id: 54, name: 'Черникова Анастасия', role: 'Жермен Саблон', src: '/uploads/Chernikova_new_9fda2bf664.webp', order: 6 },
    { id: 11, actor_id: 10, name: 'Солнцева Татьяна', role: 'Мария', src: '/uploads/Solnczeva_Tatyana_2803ac3bfc.webp', order: 8 },
    { id: 83, actor_id: 16, name: 'Архипов Григорий', role: 'Репортеры', src: '/uploads/Arhipov_new_44cb71ee2b.webp', order: 12 },
    { id: 111, actor_id: 34, name: 'Крюкова Полина', role: 'Канкан', src: '/uploads/Kryukova_new_69676ba678.webp', order: 13 },
    { id: 32, actor_id: 30, name: 'Мишанина Ксения', role: 'Канкан', src: '/uploads/Mishanina_new_26948c3fd4.webp', order: 13 },
    { id: 30, actor_id: 28, name: 'Каменева Полина', role: 'Канкан', src: '/uploads/Kameneva_new_becab67428.webp', order: 13 },
    { id: 22, actor_id: 20, name: 'Владимиров Егор', role: 'Адьютант генерала', src: '/uploads/Vladimrov_Egor_e194925fd4.webp', order: 10 },
    { id: 109, actor_id: 113, name: 'Васильева Мария', role: 'Канкан', src: '/uploads/Vasileva_Mariya_1_e8362173a1.webp', order: 13 },
    { id: 5, actor_id: 7, name: 'Бегма Владимир', role: 'Следователь', src: '/uploads/thumbnail_upload_images_actor_2016_06_begma_3be1d81f21_0f457aee80.jpg', order: 4 },
    { id: 23, actor_id: 21, name: 'Бобров Александр', role: 'Адьютант генерала', src: '/uploads/Rectangle_54_0c2c75ff56.png', order: 10 },
    { id: 25, actor_id: 23, name: 'Дудниченко Олеся', role: 'Канкан', src: '/uploads/upload_images_actor_2022_11_chudnichenko_olesya_2ce733fc14_3012dacf3f.jpg', order: 13 },
    { id: 1, actor_id: 3, name: 'Зайцева Ирина', role: 'Эдит Пиаф', src: '/uploads/upload_images_actor_2022_10_irina_zaiceva_new_d18d2de374_8d499c7a0f.jpg', order: 1 },
    { id: 6, actor_id: 8, name: 'Карпов Валерий', role: 'Поль Мерисс', src: '/uploads/upload_images_actor_2022_11_valerii_karpov_3960e4360c_b4de0e2118.jpg', order: 5 },
    { id: 14, actor_id: 13, name: 'Клюшкин Михаил', role: 'Генерал', src: '/uploads/Klyushkin_new_d4bdbc0d2b.webp', order: 9 },
    { id: 85, actor_id: 14, name: 'Комаров Борис', role: 'Репортеры', src: '/uploads/upload_images_actor_2016_05_4_81b4f39821_9122142586.jpg', order: 12 },
    { id: 12, actor_id: 11, name: 'Луцкая Надежда', role: 'Мария', src: '/uploads/Luczkaya_2daa5a34da.webp', order: 8 },
    { id: 7, actor_id: 1, name: 'Лысакова Вероника', role: 'Жермен Саблон', src: '/uploads/upload_images_actor_2019_05_lysakova_na_sait_f2af64a197_cabb06f909.JPG', order: 6 },
    { id: 4, actor_id: 6, name: 'Майсурадзе Владимир', role: 'Следователь', src: '/uploads/Majsuradze_37255e8f49.webp', order: 4 },
    { id: 2, actor_id: 4, name: 'Песков Александр', role: 'Жан Кокто', src: '/uploads/Peskov_new_d60826f7b4.webp', order: 2 },
    { id: 9, actor_id: 9, name: 'Полосухин Михаил', role: 'Батист Перье', src: '/uploads/upload_images_actor_2022_05_polosuhin_new_8cc1bf52f8_5a9ee9c6db.jpg', order: 7 },
    { id: 35, actor_id: 33, name: 'Терехова Анастасия', role: 'Канкан', src: '/uploads/Terehova_bb56a02622.webp', order: 13 },
    { id: 497, actor_id: 2, name: 'Воронин Дмитрий', role: 'Поль Мерисс', src: '/uploads/voronin_nyu_907135171a.webp', order: 5 },
    { id: 10, actor_id: 2, name: 'Воронин Дмитрий', role: 'Батист Перье', src: '/uploads/voronin_nyu_907135171a.webp', order: 7 },
    { id: 24, actor_id: 22, name: 'Барышева Александра', role: 'Канкан', src: '/uploads/Barysheva_Aleksandra_3d02b974ed.webp', order: 13 },
    { id: 84, actor_id: 15, name: 'Дьяченко Дмитрий', role: 'Репортеры', src: '/uploads/Dyachenko_Dmitrij_d5834da27f.webp', order: 12 },
    { id: 19, actor_id: 18, name: 'Ронжин Захар', role: 'Помощник следователя', src: '/uploads/Ronzhin_Zahar_10ca29d7a9.webp', order: 11 },
    { id: 21, actor_id: 19, name: 'Лебедев Максим', role: 'Адьютант генерала', src: '/uploads/Lebedev_new_61533f086b.webp', order: 10 },
    { id: 3, actor_id: 5, name: 'Светличный Денис', role: 'Андре Бигар', src: '/uploads/Svetlichnyj_cfd3283d9a.webp', order: 3 },
    { id: 110, actor_id: 112, name: 'Матвиевич Елизавета', role: 'Канкан', src: '/uploads/Matvievich_Elizaveta_cdaff440cf.webp', order: 13 },
    { id: 26, actor_id: 24, name: 'Головина Юлия', role: 'Канкан', src: '/uploads/Golovina_Yuliya_7c5fea7099.webp', order: 13 }
    ]


  const sanitizedValue = useMemo(() => {
    let parsedValue
    try {
      parsedValue = JSON.parse(value || '[]')
    } catch (e) {
      parsedValue = []
    }
    return Array.isArray(parsedValue)
      ? possibleOptions.filter((val) =>
        parsedValue.some((option) => option.id === val.id),
      )
      : []
  }, [value, possibleOptions])

  return (
    <Select
      name={name}
      id={name}
      label={formatMessage(intlLabel)}
      error={
        error || (required && !possibleOptions.length ? 'No options' : null)
      }
      disabled={disabled || possibleOptions.length === 0}
      required={required}
      hint={description && formatMessage(description)}
      onChange={(v) => {
        onChange({
          target: {
            name: name,
            value: JSON.stringify(v.filter(Boolean)),
            type: attribute.type,
          },
        })
      }}
      placeholder={placeholder}
      multi
      value={sanitizedValue}
      withTags>
      {possibleOptions
        .sort((a, b) => a.order - b.order)
        .map((role) => (
          <Option value={role} key={role.id}>
            {`${role.role} - ${role.name}`}
          </Option>
        ))}
    </Select>
  )
}

RoleSelect.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
}

RoleSelect.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
}

export default RoleSelect

/*
SELECT ar.id, a.id, a.title, pr.role_title, f.url, pl.play_role_order
FROM play_roles_play_links pl
JOIN play_roles pr ON pl.play_role_id=pr.id
JOIN persons_play_roles_links ar ON ar.play_role_id=pl.play_role_id
JOIN persons a ON a.id=ar.person_id
JOIN files_related_morphs r ON r.related_id = a.id
JOIN files f ON f.id = r.file_id
WHERE r.field='cover'
AND r.related_type = 'api::person.person'
AND pl.play_id = 6;



SELECT a.id, a.title, pr.role_title
FROM
  play_roles_play_links pl,
  play_roles pr,
  persons_play_roles_links ar,
  persons a
WHERE pl.play_role_id=pr.id
AND ar.play_role_id=pl.play_role_id
AND a.id=ar.person_id
AND pl.play_id = 6;


WHERE table1.column_name = table2.column_name

*/





