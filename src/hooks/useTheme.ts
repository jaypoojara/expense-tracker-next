import { getThemeMode } from '@/store/selector/getThemeMode';
import { toggleTheme } from '@/store/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

const useTheme = () => {
    const mode = useSelector(getThemeMode);
    const dispatch = useDispatch();

    const changeTheme = () => dispatch(toggleTheme());
    const isDarkMode = mode === "dark"
    return { mode, changeTheme, isDarkMode };
}

export default useTheme
