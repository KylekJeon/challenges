export interface Row {
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  eyeColor: string;
  created: string;
  edited: string;
}

export interface Column {
  name: string;
  selected: boolean;
  isAscending: boolean;
}