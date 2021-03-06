export default {
  keyboardSizes: [
    {
      value: 'full',
      label: '100% / Fullsize',
    },
    {
      value: '80',
      label: '80% / TKL',
    },
    {
      value: '65',
      label: '65%',
    },
    {
      value: '60',
      label: '60%',
    },
    {
      value: '40',
      label: '40%',
    },
    {
      value: 'numpad',
      label: 'Numpad',
    },
    {
      value: 'other',
      label: 'Non-Standard',
    },
  ],
  keysLayouts: [
    {
      value: 'ANSI',
      label: 'ANSI',
    },
    {
      value: 'ISO',
      label: 'ISO',
    },
    {
      value: 'JIS',
      label: 'JIS',
    },
    {
      value: 'other',
      label: 'Custom',
    },
  ],
  layouts: [
    {
      value: 'staggered',
      label: 'Staggered',
    },
    {
      value: 'ortholinear',
      label: 'Ortholinear',
    },
    {
      value: 'split-staggered',
      label: 'Split-Staggered',
    },
    {
      value: 'split-ortholinear',
      label: 'Split-Ortholinear',
    },
    {
      value: 'other',
      label: 'Custom',
    },
  ],
  keyboardProgrammable: ['Yes', 'No', 'Partially'],
  availability: [
    {
      value: 'IC',
      label: 'Interest Check',
    },
    {
      value: 'GB',
      label: 'Group Buy',
    },
    {
      value: 'available',
      label: 'Retail',
    },
    {
      value: 'GBend',
      label: 'Group Buy Ended',
    },
    {
      value: 'end',
      label: 'Production Ended',
    },
  ],
  spacebarSizes: ['3u', '6u', '6.25u', '6.5u', '7u'],
  plateMaterials: ['Brass', 'Aluminum', 'Stainless steel'],
  caseMaterials: ['Aluminum', 'Wood', 'Plastic', 'Acrylic'],
  keyboardFirmwares: ['TMK', 'QMK', 'Built-in'],
  keyboardInterfaces: ['USB-C', 'Micro-USB'],
  keyboardPrices: ['0-50', '50-100', '100-200', '200-300', '300+', 'Aftermarket only'],
  keyboardKeycaps: ['ABS', 'PBT', 'ABS Doubleshot', 'PBT Doubleshot'],
  switchTypes: ['Linear', 'Tactile', 'Clicky'],
  stemTypes: ['Cherry MX', 'Alps', 'Choc', 'Matias'],
  keycapProfile: ['Cherry', 'OEM', 'DSA', 'SA', 'XDA', 'MDA', 'MIX', 'KAT', 'KAM', 'MT3', 'ADA'],
  keycapMaterial: ['ABS', 'PBT'],
  keycapKits: ['Spacebar', '40%', 'Ortho', 'Ergo', 'Alphas', 'Mods', 'Numpad'],
  keycapPrintMethods: ['Dye Sub', 'Double-shot', 'Laser', 'Triple-shot', 'None'],
}
