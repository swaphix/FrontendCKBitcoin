import { useForm } from "react-hook-form";
import ButtonPrimary from "../../components/buttonPrimary";
import { useState, useEffect } from "react";
import StatusButton from "../../models/button_status_enum";
import { ChangeIsBack } from "../../redux/mainSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { routesNames } from "../../routes/routes";
import iconBtc  from "../../assets/images/ckBTC-token.png";
import { walletFrom, walletTo } from "../../common/constants/constants";
import TransactionService from "../../services/transaction_service";
import useErrorHandling from "../../hooks/useError";
import toast from "react-hot-toast";


/* eslint-disable no-case-declarations */
const NewTransactioCryptoPage = () => {
  //=============  REACT FORM ============= 
  type FormValues = {
    amount: number,
    wallet: string,

  }
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()

  const { register, handleSubmit, formState: { errors }, watch, setError, setValue } = useForm<FormValues>()
  const amountWatched = watch('amount');


  //=============  REACT FORM ============= 
  const [statusbutton, setStatusButton] = useState(StatusButton.Disabled);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [execute, setExecute] = useState(false);

  //=============  INIT ============= 
  const init = async () => {
    dispatch(ChangeIsBack({
      isBack: true,
    }))
    setValue('wallet', walletTo)
    getBalance();
  }
  useEffect(() => {
    init();
    // repeat();
  }, []);

  useEffect(() => {
    console.log('Valor del campo cambiado:', amountWatched);
    if (amountWatched != undefined) {
      if (amountWatched <= 0) {
        console.log('Amount')
        setError('amount', { type: 'manual', message: 'El monto debe ser mayor a 0' })
        return
      }
      return
    }
    setError('amount', { type: 'manual', message: '' })
    setStatusButton(StatusButton.Enabled)

  }, [amountWatched]);
  //=============  INIT ============= 

  const getBalance = async () =>{
    if(execute===false){
      const response = await TransactionService.getBalance(walletFrom)
      setExecute(true)
      console.log(response)
      if(response.status === 200 ){
        setValue('amount', response.data.Balance)
      }
    }
  }

  const onSubmit = async () => {
    try{
      setStatusButton(StatusButton.Loading)
      console.log('============== START TRANSACTION ============== ')
      const response = await TransactionService.newTransaction();
      console.log('============== START TRANSACTION RESPONSE ==============: ' +response.status)
      if(response.status === 200){
        navigate(routesNames.messageSuccessSendCrypto)
      }
      setStatusButton(StatusButton.Enabled)
  
    }
    catch(e){
      setStatusButton(StatusButton.Enabled)
      handleErrors(e)
      console.error(e)
    }
  }

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])


  return (
    <>
      <div className="my-0 mb-8">
        <h4 className="titleTxt text-lg">
          Hola,{'user'}
        </h4>
        <h1 className="titleTxt">
          Enviar
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <div className="w-full flex flex-row justify-between mt-4 items-center">
            <p className="font-bold">Criptomoneda o Token: </p>
            <div className="bg-grayLow flex flex-row p-2 rounded-lg gap-2">
              <img src={iconBtc} alt="bitcoin" className="w-[25px] h-[25px]" />
              <p className="font-bold">ckBTC</p>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between mt-4 mb-4 items-center" >
            <p className="font-bold">Red: </p>
            <div className="bg-grayLow flex flex-row p-2 rounded-lg gap-2">
              <p className="font-bold">ICP</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <div className="relative">
                <input className="inputNumber text-end" placeholder='0.0' type="number" {...register('amount',
                  {
                    required: {
                      value: true,
                      message: "Ingresa un monto valido"
                    },
                  })} />
                {errors.amount && <span className="errorTxt">{errors.amount.message}</span>}
                <span onClick={()=>getBalance()} className='cursor-pointer absolute left-1 top-2 bottom-0 text-purple font-bold mr-20'>MAX</span>
              </div>
            </div>
            <div className="w-full flex flex-row justify-end mt-1 mb-5" >
              <span className="text-grayBold m-0"><strong className="mr-10">Disponible:</strong>   {'0.30 bitcoin'}</span>
            </div>
            <div className="w-full h-24  flex flex-col items-start">
              <p className="font-bold">Dirección de destino: </p>
              <textarea className="inputTextArea text-start" placeholder='' {...register('wallet',
                {
                  required: {
                    value: true,
                    message: "Ingresa un monto valido"
                  },
                })} />
              {errors.wallet && <span className="errorTxt">{errors.wallet.message}</span>}
            </div>
            <div className="w-full mt-7 flex flex-col items-start">
              <span className="text-xs text-start">Revisa siempre que la dirección sea de <strong>misma red</strong>  en dónde está tu criptomoneda o token a enviar.</span>
            </div>
            <div className="w-full flex flex-row justify-end mt-1 mb-5" >
              <span className="text-grayBold m-0"><strong className="mr-10">Comisión:</strong>   {'0.0 ckBTC'}</span>
            </div>
            <div className="w-full flex flex-row justify-between mt-6 mb-4 items-center" >
              <p className="font-bold">Monto a recibir: </p>
              <div className="bg-grayLow flex flex-row p-2 rounded-lg gap-2">
                <p className="font-bold">0.0</p>
                <img src={iconBtc} alt="bitcoin" className="w-[25px] h-[25px]" />
                <p className="font-bold">ckBTC</p>

              </div>
            </div>
            <ButtonPrimary type="submit" name="Enviar" status={statusbutton} onClick={() => { }} />
          </form>
        </div>
      </div>
    </>

  )
}

export default NewTransactioCryptoPage;