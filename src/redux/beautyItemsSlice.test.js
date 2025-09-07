import reducer, {
  changeUserName,
  addToBasket,
  incrementQuantity,
  decrementQuantity,
  setBasket,
 
} from "./beautyItemsSlice";

describe("itemsSlice reducers", () => {
  const initialState = {
    dataLoadState: 0,
    dataLoadError: null,
    productsArr: [],
    userName: "",
    basket: [],
    numberOfAllList: 0,
  };

  test("changeUserName обновляет имя пользователя", () => {
    const nextState = reducer(initialState, changeUserName("Анна"));
    expect(nextState.userName).toBe("Анна");
  });

  test("addToBasket добавляет новый товар", () => {
    const product = { id: 1, name: "Помада", price: "10" };
    const nextState = reducer(initialState, addToBasket(product));
    expect(nextState.basket.length).toBe(1);
    expect(nextState.basket[0].quantity).toBe(1);
    expect(nextState.numberOfAllList).toBe(1);
  });

  test("incrementQuantity увеличивает количество товара", () => {
    const product = { id: 1, name: "Помада", price: "10" };
    let state = reducer(initialState, addToBasket(product));
    state = reducer(state, incrementQuantity(1));
    expect(state.basket[0].quantity).toBe(2);
    expect(state.numberOfAllList).toBe(2);
  });

  test("decrementQuantity уменьшает количество товара и удаляет при 0", () => {
    const product = { id: 1, name: "Помада", price: "10" };
    let state = reducer(initialState, addToBasket(product));
    state = reducer(state, decrementQuantity(1));
    expect(state.basket.length).toBe(0);
    expect(state.numberOfAllList).toBe(0);
  });

  test("setBasket устанавливает корзину и количество", () => {
    const basket = [{ id: 1, name: "Помада", quantity: 2 }];
    const nextState = reducer(initialState, setBasket(basket));
    expect(nextState.basket).toEqual(basket);
    expect(nextState.numberOfAllList).toBe(2);
  });
});

