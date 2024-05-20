import styles from './MainDescription.module.scss';
function MainDescription(): JSX.Element {
  return (
    <>
      <div className={styles.wrapperDescription}>
        <div className=" w-2/4">
          <p className="text-3xl mb-2">Ваш лучший криптообменник</p>
          <div className="flex flex-col sm:flex-row ">
            <div className="flex flex-col sm:w-1/3">
              <div className=" flex opacity-25">
                {' '}
                <img width={100} src="number-1.svg" alt="number-1.svg" />{' '}
                <img width={100} src="arrow_right.svg" alt="" />
              </div>
              <div className=" p-2">
                <p className="text-xl">Выберите валюту</p>{' '}
                <p className='mt-2'>Выберите из более чем 50000 поддерживаемых пар</p>
              </div>
            </div>
            <div className="flex flex-col sm:w-1/3">
              <div className=" flex opacity-25">
                {' '}
                <img width={100} src="number-2.svg" alt="number-3.svg" />{' '}
                <img width={100} src="arrow_right.svg" alt="" />
              </div>
              <div className=" p-2">
                <p className="text-xl">Внесите депозит</p>{' '}
                <p className='mt-2'>
                  Подтвердите детали и отправьте средства по сгенерированному
                  адресу
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:w-1/3">
              <div className=" flex">
                {' '}
                <img width={100} className='opacity-25' src="number-3.svg" alt="number-3.svg" />{' '}
                <img width={75} src="done.svg" alt="" />
              </div>
              <div className=" p-2">
                <p className="text-xl">Получите средства</p>{' '}
                <p className='mt-2'>
                  Получите средства в выбранной валюте по максимально выгодному
                  курсу
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainDescription;
