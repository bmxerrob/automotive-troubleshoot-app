export interface VehicleMake {
  name: string
  models: string[]
}

export const VEHICLE_MAKES: VehicleMake[] = [
  { name: 'Acura', models: ['ILX', 'MDX', 'RDX', 'RLX', 'TLX', 'NSX', 'Integra'] },
  { name: 'Alfa Romeo', models: ['Giulia', 'Stelvio', 'Tonale', '4C Spider'] },
  { name: 'Audi', models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron', 'e-tron GT'] },
  { name: 'BMW', models: ['2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'M3', 'M4', 'M5', 'i3', 'i4', 'iX'] },
  { name: 'Buick', models: ['Enclave', 'Encore', 'Encore GX', 'Envision', 'LaCrosse'] },
  { name: 'Cadillac', models: ['CT4', 'CT5', 'Escalade', 'Escalade ESV', 'XT4', 'XT5', 'XT6', 'LYRIQ'] },
  { name: 'Chevrolet', models: ['Blazer', 'Bolt EV', 'Camaro', 'Colorado', 'Corvette', 'Equinox', 'Malibu', 'Silverado 1500', 'Silverado 2500HD', 'Suburban', 'Tahoe', 'Trailblazer', 'Traverse', 'Trax'] },
  { name: 'Chrysler', models: ['300', 'Pacifica', 'Voyager'] },
  { name: 'Dodge', models: ['Challenger', 'Charger', 'Durango', 'Grand Caravan', 'Hornet'] },
  { name: 'Ford', models: ['Bronco', 'Bronco Sport', 'EcoSport', 'Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'F-250 Super Duty', 'Maverick', 'Mustang', 'Mustang Mach-E', 'Ranger', 'Transit'] },
  { name: 'Genesis', models: ['G70', 'G80', 'G90', 'GV70', 'GV80'] },
  { name: 'GMC', models: ['Acadia', 'Canyon', 'Envoy', 'Sierra 1500', 'Sierra 2500HD', 'Terrain', 'Yukon', 'Yukon XL'] },
  { name: 'Honda', models: ['Accord', 'Civic', 'CR-V', 'HR-V', 'Odyssey', 'Passport', 'Pilot', 'Ridgeline', 'Fit', 'Insight', 'Element'] },
  { name: 'Hyundai', models: ['Elantra', 'Ioniq 5', 'Ioniq 6', 'Kona', 'Palisade', 'Santa Cruz', 'Santa Fe', 'Sonata', 'Tucson', 'Venue', 'Veloster'] },
  { name: 'Infiniti', models: ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80'] },
  { name: 'Jaguar', models: ['E-Pace', 'F-Pace', 'F-Type', 'I-Pace', 'XE', 'XF'] },
  { name: 'Jeep', models: ['Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Grand Wagoneer', 'Renegade', 'Wagoneer', 'Wrangler'] },
  { name: 'Kia', models: ['Carnival', 'EV6', 'Forte', 'K5', 'Niro', 'Seltos', 'Sorento', 'Soul', 'Sportage', 'Stinger', 'Telluride'] },
  { name: 'Land Rover', models: ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'] },
  { name: 'Lexus', models: ['ES', 'GS', 'GX', 'IS', 'LC', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX'] },
  { name: 'Lincoln', models: ['Aviator', 'Corsair', 'Nautilus', 'Navigator'] },
  { name: 'Mazda', models: ['CX-3', 'CX-30', 'CX-5', 'CX-50', 'CX-9', 'CX-90', 'Mazda3', 'Mazda6', 'MX-5 Miata', 'MX-30'] },
  { name: 'Mercedes-Benz', models: ['A-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'G-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'S-Class', 'SL', 'AMG GT', 'EQB', 'EQS'] },
  { name: 'Mitsubishi', models: ['Eclipse Cross', 'Galant', 'Lancer', 'Mirage', 'Outlander', 'Outlander Sport'] },
  { name: 'Nissan', models: ['Altima', 'Armada', 'Frontier', 'Kicks', 'Leaf', 'Maxima', 'Murano', 'Pathfinder', 'Rogue', 'Rogue Sport', 'Sentra', 'Titan', 'Versa', '370Z', '400Z'] },
  { name: 'Porsche', models: ['718 Boxster', '718 Cayman', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'] },
  { name: 'Ram', models: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'] },
  { name: 'Subaru', models: ['Ascent', 'BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'Solterra', 'WRX'] },
  { name: 'Tesla', models: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'] },
  { name: 'Toyota', models: ['4Runner', 'Avalon', 'Camry', 'Corolla', 'Corolla Cross', 'Crown', 'GR86', 'Highlander', 'Land Cruiser', 'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Supra', 'Tacoma', 'Tundra', 'Venza', 'bZ4X'] },
  { name: 'Volkswagen', models: ['Arteon', 'Atlas', 'Atlas Cross Sport', 'Golf', 'ID.4', 'Jetta', 'Passat', 'Taos', 'Tiguan'] },
  { name: 'Volvo', models: ['C40 Recharge', 'S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90'] },
]

export function getModelsForMake(makeName: string): string[] {
  return VEHICLE_MAKES.find((m) => m.name === makeName)?.models ?? []
}

export const YEARS: number[] = Array.from({ length: 37 }, (_, i) => 2026 - i)
