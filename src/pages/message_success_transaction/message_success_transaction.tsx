import { useNavigate } from "react-router-dom";
import wallet from "../../assets/images/wallet_bitcoin.webp";

import ButtonPrimary from "../../components/buttonPrimary";
import StatusButton from "../../models/button_status_enum";
import { routesNamesApp } from "../../routes/routes";
import { useForm } from "react-hook-form";
import { ChangeIsBack } from "../../redux/mainSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import toast, { Toaster } from "react-hot-toast";

const MessageWarningTransaction = () => {
  const navigate = useNavigate();
  //=============  REACT FORM ============= 
  type FormValues = {
    email: string,
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  //=============  REACT FORM ============= 
  const dispatch = useDispatch();

  //=============  INIT ============= 
  const init = async () => {
    dispatch(ChangeIsBack({
      isBack: false,
    }))
  }
  useEffect(() => {
    init();
    // repeat();
  });

  //=============  INIT ============= 
  const onSubmit = () => {
    toast.success('CORREO ENVIADO EXITOSAMENTE')
    navigate(routesNamesApp.newTransaction);
  }

  return (
    <div className="bg-globalWhite relative h-screen w-screen overflow-auto">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar></Navbar>
      <div className=" h-full flex w-full flex-col items-center justify-start">
        <div className="w-full px-10 lg:w-2/6">
          <h1 className="splashTxt text-grayBold">
            ¡Transacción
            exitosa!
          </h1>
          <img src={wallet} className=" ml-auto mr-auto mb-20 h-[300px]"></img>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col justify-start">
              <label htmlFor="email" className="labelTxt text-start">Enviar comprobante por email:</label>
              <input className="inputNumber" placeholder='Nombre' type="email" {...register('email',
                {
                  required: {
                    value: true,
                    message: "Ingresa un email valido"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Ingresa un e-mail válido'
                  }
                })} />
              {errors.email && <span className="errorTxt">{errors.email.message}</span>}

            </div>
            <ButtonPrimary type="submit" name="Enviar" status={StatusButton.Enabled} onClick={()=>{}}/>
            <a className="textButtonBlack" onClick={()=>navigate(routesNamesApp.newTransaction)}>Omitir</a>
          </form>
        </div>
      </div>

    </div>

  )
}


export default MessageWarningTransaction;