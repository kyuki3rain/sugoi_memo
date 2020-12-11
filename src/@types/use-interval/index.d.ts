declare module "use-interval" {
  declare function useInterval(
    callback: () => void,
    delay: number,
    immediate?: boolean /* called when mounted if true */
  ): void;
}
