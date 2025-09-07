import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BeautyItem from './BeautyItem';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('react-redux'); // мокируем хуки redux

describe('BeautyItem', () => {
  const product = {
    id: 1,
    name: 'Помада',
    image_link: 'test.jpg',
    price: '10',
  };

  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  test('рендерит имя и цену товара', () => {
    useSelector.mockReturnValue('Анна'); // пользователь залогинен

    render(<BeautyItem info={product} showToast={() => {}} />);

    // Проверяем наличие текста
    expect(screen.getByText('Помада')).toBeDefined();
    expect(screen.getByText('10$')).toBeTruthy();

    // Проверяем что текст не пустой
    expect(screen.getByText('Помада').textContent).not.toBe('');
    expect(screen.getByText('10$').textContent).toMatch(/\d+/);
  });

  test('кнопка disabled, если пользователь не залогинен', () => {
    useSelector.mockReturnValue(''); // пустое имя

    render(<BeautyItem info={product} showToast={() => {}} />);
    const button = screen.getByRole('button', { name: /add/i });

    expect(button).toBeDisabled();
    expect(button.className).toBe('DisabledAdd');
  });

  test('клик вызывает showToast и dispatch', () => {
    useSelector.mockReturnValue('Анна'); // пользователь залогинен
    const mockToast = jest.fn();

    render(<BeautyItem info={product} showToast={mockToast} />);
    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    // Проверяем вызов коллбэков
    expect(mockToast).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith('Item added to basket');
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('проверка изображения и атрибута alt', () => {
    useSelector.mockReturnValue('Анна');
    render(<BeautyItem info={product} showToast={() => {}} />);

    const img = screen.getByAltText('Помада');
    expect(img).toBeTruthy();
    expect(img.src).toMatch(/test\.jpg$/);
    expect(img.src).not.toBe('');
  });
});
