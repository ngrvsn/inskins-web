'use client'

import { WeaponSelector } from '@/components/ui'
import styles from './WeaponPanel.module.scss'

interface IWeaponOption {
  value: string
  label: string
}

interface IWeaponPanelProps {
  selectedWeapons: {
    knife: string
    pistol: string
    rifle: string
    sniper: string
    smg: string
    shotgun: string
  }
  onWeaponChange: (category: string, weapon: string) => void
}

const weaponOptions = {
  knife: [
    { value: 'all', label: 'Все ножи' },
    { value: 'karambit', label: 'Karambit' },
    { value: 'bayonet', label: 'Bayonet' },
    { value: 'butterfly', label: 'Butterfly Knife' },
    { value: 'flip', label: 'Flip Knife' },
    { value: 'gut', label: 'Gut Knife' },
    { value: 'huntsman', label: 'Huntsman Knife' }
  ],
  pistol: [
    { value: 'all', label: 'Все пистолеты' },
    { value: 'glock', label: 'Glock-18' },
    { value: 'usp', label: 'USP-S' },
    { value: 'p250', label: 'P250' },
    { value: 'deagle', label: 'Desert Eagle' },
    { value: 'fiveseven', label: 'Five-SeveN' },
    { value: 'tec9', label: 'Tec-9' }
  ],
  rifle: [
    { value: 'all', label: 'Все винтовки' },
    { value: 'ak47', label: 'AK-47' },
    { value: 'm4a4', label: 'M4A4' },
    { value: 'm4a1s', label: 'M4A1-S' },
    { value: 'famas', label: 'FAMAS' },
    { value: 'galil', label: 'Galil AR' },
    { value: 'aug', label: 'AUG' }
  ],
  sniper: [
    { value: 'all', label: 'Все снайперские' },
    { value: 'awp', label: 'AWP' },
    { value: 'scout', label: 'SSG 08' },
    { value: 'scar20', label: 'SCAR-20' },
    { value: 'g3sg1', label: 'G3SG1' }
  ],
  smg: [
    { value: 'all', label: 'Все пистолеты-пулеметы' },
    { value: 'mp9', label: 'MP9' },
    { value: 'mac10', label: 'MAC-10' },
    { value: 'ump45', label: 'UMP-45' },
    { value: 'bizon', label: 'PP-Bizon' },
    { value: 'p90', label: 'P90' }
  ],
  shotgun: [
    { value: 'all', label: 'Все дробовики' },
    { value: 'nova', label: 'Nova' },
    { value: 'xm1014', label: 'XM1014' },
    { value: 'sawedoff', label: 'Sawed-Off' },
    { value: 'mag7', label: 'MAG-7' }
  ]
}

export const WeaponPanel = ({
  selectedWeapons,
  onWeaponChange
}: IWeaponPanelProps) => {
  return (
    <div className={styles.weaponPanel}>
      <WeaponSelector
        value={selectedWeapons.knife}
        onChange={(weapon) => onWeaponChange('knife', weapon)}
        options={weaponOptions.knife}
      />
      <WeaponSelector
        value={selectedWeapons.pistol}
        onChange={(weapon) => onWeaponChange('pistol', weapon)}
        options={weaponOptions.pistol}
      />
      <WeaponSelector
        value={selectedWeapons.rifle}
        onChange={(weapon) => onWeaponChange('rifle', weapon)}
        options={weaponOptions.rifle}
      />
      <WeaponSelector
        value={selectedWeapons.sniper}
        onChange={(weapon) => onWeaponChange('sniper', weapon)}
        options={weaponOptions.sniper}
      />
      <WeaponSelector
        value={selectedWeapons.smg}
        onChange={(weapon) => onWeaponChange('smg', weapon)}
        options={weaponOptions.smg}
      />
      <WeaponSelector
        value={selectedWeapons.shotgun}
        onChange={(weapon) => onWeaponChange('shotgun', weapon)}
        options={weaponOptions.shotgun}
      />
    </div>
  )
}
