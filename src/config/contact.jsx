const seed = async () => {
  localStorage.clear();
  const initialData = {
    accountname: 'villan_1',
    token: import.meta.env.VITE_ADMIN_KEY
    };
  const contacts = await localStorage.getItem('admin')
  if (!contacts) {
    const newData = JSON.stringify(initialData);
    localStorage.setItem('admin', newData);
  }
}

seed();
