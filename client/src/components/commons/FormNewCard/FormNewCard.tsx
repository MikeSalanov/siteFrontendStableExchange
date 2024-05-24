import { observer } from "mobx-react-lite";
import CardFormType from "../../../../classes/CardFormType.ts";
import Store from '../../../store/store.ts';
import styles from "../FormForAddRuCard/FormForAddRuCard.module.scss";
import FormForAddRuCard from "../FormForAddRuCard/FormForAddRuCard.tsx";
import ForeignCardForm from "../ForeignCardForm/ForeignCardForm.tsx";

const store: Store = new Store();

const FormNewCard = observer(({
  setFormNewCard,
}: {
  setFormNewCard: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  
  return (
    <div className={styles.modalWrapper} onClick={() => setFormNewCard(false)}>
    <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
      <div className="formOfAddingCard">
        <div>
          <button onClick={() => store.setActiveTab(CardFormType.WORLD)} className={styles.btn}>
            Foreign Card
          </button>
          <button onClick={() => store.setActiveTab(CardFormType.RU)} className={styles.btn}>
            Russian Card
          </button>
        </div>
        {store.activeTabOfCardForm === CardFormType.WORLD ? <ForeignCardForm /> : <FormForAddRuCard />}
      </div>
    </div>
    </div>
  );
});

export default FormNewCard;
