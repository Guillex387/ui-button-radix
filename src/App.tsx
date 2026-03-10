import { ButtonAlt } from './components/ui/button-alt';

/* Iconos inline (se pueden mover a un módulo de iconos) */
const IconOverflow = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden>
    <circle cx="5" cy="11" r="1.5" />
    <circle cx="11" cy="11" r="1.5" />
    <circle cx="17" cy="11" r="1.5" />
  </svg>
);

const IconSend = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 2L2 11l18 9-4-9 4-9z" />
    <path d="M20 2L10 13" />
  </svg>
);

const IconTrash = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M4 6h14l-1 12H5L4 6z" />
    <path d="M8 6V4a2 2 0 012-2h2a2 2 0 012 2v2" />
    <path d="M9 10v6M13 10v6" />
  </svg>
);

function App() {
  return (
    <div className="min-h-screen bg-white p-20 box-border">
      <h1 className="font-poppins font-bold text-[38px] leading-tight text-[#1c293b] m-0 mb-6">ButtonsAlt</h1>

      <section className="mb-12">
        <h2 className="font-inter font-bold text-base text-[#121212] m-0 mb-4">ButtonAltPrimary</h2>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <ButtonAlt variant="primary" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="primary" state="hover" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="primary" state="active" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="primary" state="focus" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="primary" state="disabled" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonAlt variant="primary" iconLeft={IconSend} className="w-full max-w-[359px]">
            Bonton Primario Fill
          </ButtonAlt>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-inter font-bold text-base text-[#121212] m-0 mb-4">ButtonAltSecondary</h2>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <ButtonAlt variant="secondary" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="secondary" state="hover" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="secondary" state="active" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="secondary" state="focus" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
          <ButtonAlt variant="secondary" state="disabled" iconLeft={IconOverflow}>
            ButtonAlt
          </ButtonAlt>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonAlt variant="secondary" iconLeft={IconSend} className="w-full max-w-[356px]">
            Botón Secundario Fill
          </ButtonAlt>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-inter font-bold text-base text-[#121212] m-0 mb-4">ButtonAltDelete</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonAlt variant="delete" iconLeft={IconTrash}>
            DeleteAlt
          </ButtonAlt>
          <ButtonAlt variant="delete" state="hover" iconLeft={IconTrash}>
            DeleteAlt
          </ButtonAlt>
          <ButtonAlt variant="delete" state="active" iconLeft={IconTrash}>
            DeleteAlt
          </ButtonAlt>
          <ButtonAlt variant="delete" state="focus" iconLeft={IconTrash}>
            DeleteAlt
          </ButtonAlt>
          <ButtonAlt variant="delete" state="disabled" iconLeft={IconTrash}>
            DeleteAlt
          </ButtonAlt>
        </div>
      </section>
    </div>
  );
}

export default App;
