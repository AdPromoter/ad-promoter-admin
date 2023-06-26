import { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const onOpenMenuHandler = () =>
  {
    setMenuIsOpen(!menuIsOpen)
  }

    return (
      <>
        <AdminNavbar onOpenMenu={onOpenMenuHandler} isMenuOpen={menuIsOpen}/>
        {menuIsOpen && <AdminSidebar onOpenMenu={onOpenMenuHandler}/>}
        {children}
      </>
    );
  };
  
  export default AdminLayout;
  