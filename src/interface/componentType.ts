export interface PopUpComponent {
  backdrop: boolean;
  type: "" | "person" | "address" | "contact";
}

export interface ToggleDelete {
  active: boolean;
  name: string;
  title: string;
  id: string;
}

export interface ChildrenProp {
  children?: React.ReactNode;
}
