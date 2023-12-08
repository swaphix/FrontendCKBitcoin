import { Sidebar } from 'primereact/sidebar';
import { routesNamesApp } from '../../routes/routes';
import { useState } from 'react';
import { useNavigate } from 'react-router';



const SideNavCustom = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false)

  const selectItem = (value: number) => {
      switch (value) {
          case 0:
              navigate(routesNamesApp.newTransaction)
              break;
          case 1:
              navigate(routesNamesApp.newTransactionCrypto)
              break;
      }

  };

  const sidebar = {
      background: '#40006A',
      padding: '0px',
      width: '100%',
      zIndex: '10'
  }

  return (
      <div className="sidebar-container w-full">
          <Sidebar style={sidebar} className="p-sidebar-lg color-globalWhite absolute flex-col items-end top-0 h-full w-full sidebar card flex flex-column justify-content-center bg-purple" visible={isVisible} onHide={() => setIsVisible(false)} fullScreen>
          <div className={"item-main  mt-5"} onClick={() => selectItem(0)}>
                  <p>Nueva transacción</p>
              </div>
              <div className={"item-main  mt-5"} onClick={() => selectItem(1)}>
                  <p>Enviar cripto</p>
              </div>
          </Sidebar>
      </div>



  )
}

export default SideNavCustom;