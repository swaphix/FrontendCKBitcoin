import { useState, useEffect } from "react";
import { ChangeIsBack } from "../../redux/mainSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { lsConversionData, walletFrom } from "../../common/constants/constants";
import { ConvertModel } from "../../models/convert_model";
import logoAnimated from "../../assets/animations/swaphix_logo_animated.gif";
import ProgressBar from "../../components/progressBar";
import TransactionService from "../../services/transaction_service";
import iconBtc from "../../assets/images/ckBTC-token.png";
import useErrorHandling from "../../hooks/useError";
import toast from "react-hot-toast";
import { routesNames } from "../../routes/routes";

const QrTransactionPage = () => {
  const [qrGen, setQr] = useState<string>();
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [convert, setConvert] = useState(new ConvertModel('ckBTC', 'ICP', '0.0', '', ''));

  const [progressPorcentage, setProgressPorcentage] = useState(0);
  const operation = 100 / 30;
  const [statusRequestInterval, setRequestInterval] = useState(false);
  const [execute, setExecute] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  //=============  INIT ============= 
  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  const init = async () => {
    dispatch(ChangeIsBack({
      isBack: false,
    }))
    try{
      const data = localStorage.getItem(lsConversionData) ?? ''
      const dataObject = JSON.parse(data);
      const response = await TransactionService.getQrBase64(walletFrom);
      const fullImage = 'data:image/png;base64,'
      setQr(fullImage + response.imgBase64?.toString());
      const convert = new ConvertModel('ckBTC', 'ICP', dataObject?.montoPesos, dataObject.totalMostrar, dataObject.comision)
      setConvert(convert)
      if(execute===false){
        console.log('============== START TRANSACTION ============== ')
        const response = await TransactionService.newTransaction();
        setExecute(true)
        console.log('============== START TRANSACTION RESPONSE ==============: ' +response.status)
        if(response.status === 200){
          navigate(routesNames.messageSuccessTransaction)
        }
        
      }
      
    }
    catch(e){
      handleErrors(e)
      console.error(e)
    }
    
  }
  useEffect(() => {
    init();
    // repeat();
  }, []);

  //=============  INIT ============= 


  const intervalTime = setInterval(function () {
    progressPorcentage
    // Código a ejecutar en cada intervalo
    let calculate = progressPorcentage + operation
    console.log(calculate);

    if (calculate > 100) {
      calculate = 0.0;
      //     sendRequestTransaction();
    }
    setProgressPorcentage(calculate)

    if (statusRequestInterval === true) {
      console.log('FROM REPEAT')
    } else {
      clearInterval(intervalTime);
    }
  }, 1000);


  return (
    <>
      <div className="my-0 mb-5">
        <h1 className="titleTxt">
          Estas Enviando
        </h1>
      </div>
      <div className="mx-5 flex flex-col items-center justify-center m-0">

        <div className="detailBox-active-account detailBox w-full flex flex-row mt-0 items-center">
          <div className="flex flex-col gap-2 pl-7 w-full justify-center">
            <div className="flex flex-row items-center justify-center">
              <p className="labelTxt text-5xl text-grayBold mr-3">{convert.totalMostrar}</p>
              <img src={iconBtc} alt="bitcoin" className="w-[25px] h-[25px] mr-2" />
              <p className="labelTxt font-normal">{convert.from_currency}</p>
            </div>
            <p className="mt-5 font-semi-bold">No cierres la pantalla hasta que la operación se haya completado…</p>
          </div>
        </div>
        <img src={logoAnimated} className="w-20 h-20 mt-5" />

        <img src={qrGen} className="w-[255px] h-[255px] mt-5" />
        <ProgressBar  progress={progressPorcentage} />

      </div>
    </>

  )
}

export default QrTransactionPage;