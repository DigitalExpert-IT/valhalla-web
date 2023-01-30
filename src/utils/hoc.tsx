type Component = () => JSX.Element | null;
type Hoc = (component: Component) => () => JSX.Element | null;

export const composeHoc =
  (...hocList: Hoc[]) =>
  (component: Component) => {
    return hocList.reduceRight((acc, val) => {
      return val(acc);
    }, component as Component);
  };
