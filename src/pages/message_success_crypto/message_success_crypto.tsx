import { useNavigate } from "react-router-dom";
import iconWallet from "../../assets/images/wallet_bitcoin.webp";

import { CloseButton } from "../../components/closebutton";
import ButtonPrimary from "../../components/buttonPrimary";
import StatusButton from "../../models/button_status_enum";
import { routesNamesApp } from "../../routes/routes";

const MessageSuccessSendCrypto = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-splash h-screen relative h-screen w-screen overflow-auto">
      <div className=" h-full flex w-full flex-col items-center justify-start">
        <CloseButton onClick={() => navigate(routesNamesApp.newTransaction)} />
        <div className="w-full px-10 lg:w-2/6">

          <h1 className="splashTxt mt-[50px]">
            ¡Envio exitoso!
          </h1>
          <img src={iconWallet} className=" ml-auto mr-auto my-20"></img>
          <ButtonPrimary type="button" name="Regresar" status={StatusButton.Enabled} onClick={() => navigate(routesNamesApp.newTransaction)} />
        </div>
      </div>

    </div>

  )
}


export default MessageSuccessSendCrypto;