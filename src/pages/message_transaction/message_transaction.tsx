import { useNavigate } from "react-router-dom";
import warning from "../../assets/images/warning.png";

import { CloseButton } from "../../components/closebutton";
import ButtonPrimary from "../../components/buttonPrimary";
import StatusButton from "../../models/button_status_enum";
import { routesNamesApp } from "../../routes/routes";

const MessageWarningTransaction = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-splash h-screen relative h-screen w-screen overflow-auto">
      <div className=" h-full flex w-full flex-col items-center justify-start">
        <CloseButton onClick={() => navigate(-1)} />
        <div className="w-full px-10 lg:w-2/6">

          <h1 className="splashTxt mt-[50px]">
            ¿Deseas continuar?
          </h1>
          <p className="splashTxtSecond mb-10 text-center">
            El monto final que vas a recibir dependerá de la volatilidad al momento así como del tiempo que tardemos en recibir tu depósito.
          </p>
          <img src={warning} className=" ml-auto mr-auto"></img>
          <ButtonPrimary type="button" name="Continuar" status={StatusButton.Enabled} onClick={() => navigate(routesNamesApp.qrTransaction)} />
        </div>
      </div>

    </div>

  )
}


export default MessageWarningTransaction;