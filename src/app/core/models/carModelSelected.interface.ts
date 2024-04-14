import { CarModel, Color } from './carModel.interface';
import { CarOption, Config } from './carOption.interface';

export type CarModelSelected = Omit<CarModel, 'colors'>;

export type ColorSelected = Color;

export type ConfigSelected = Config;

export type OptionSelected = Omit<CarOption, 'configs'>;

export interface CarSelected {
  carModel: CarModelSelected | null;
  color: ColorSelected | null;
  config: ConfigSelected | null;
  option: OptionSelected | null;
}
