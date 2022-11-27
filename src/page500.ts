import Page500Page from './pages/page500';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const page500Page = new Page500Page();
    renderDOM('#app', page500Page);
});
