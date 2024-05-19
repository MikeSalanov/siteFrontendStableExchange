import styles from './Footer.module.scss';
function Footer(): JSX.Element {
  return (
    <div className={`${styles.wrapperFooter} ${styles.spaceTop}`}>
      <div className=" w-2/4 border-t-2 border-gray-500">
        <div className="flex justify-between">
          <div>
            <h4 className=" text-lg">Компания</h4>
            <p className="mt-2 hover:text-gray-400 hover:cursor-pointer">О нас</p>
          </div>
          <div>
            <h4 className=" text-lg">Партнерам</h4>
            <p className="mt-2  hover:text-gray-400 hover:cursor-pointer">Партнерская программа</p>
          </div>
          <div>
            <h4 className=" text-lg">Поддержка</h4>
            <p className="mt-2  hover:text-gray-400 hover:cursor-pointer">Часто задаваемые вопросы</p>{' '}
            <p className=" hover:text-gray-400 hover:cursor-pointer">Как это работает</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
