import s from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={s.footer}>
            <div>
                <p>
                Todos os direitos reservados &copy; Iago Roque {new Date().getFullYear()}
                </p>
                <p className={s.digi}>Feito para <a href="https://digi.tec.br/" target='_blank'>Digi.tec</a></p>
            </div>
        </footer>
    );
};

export default Footer;