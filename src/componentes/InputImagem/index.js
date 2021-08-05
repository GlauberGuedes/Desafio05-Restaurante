import PublishIcon from "@material-ui/icons/Publish";
import imagemVazia from "../../assets/imagem-vazia.svg";
import useStyles from "./style";

export default function InputImagem({ imagem, setBase64Imagem }) {
  const classes = useStyles();

  const uploadImagem = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const base = base64.replace("data:image/png;base64,", "");
    setBase64Imagem(base);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className={classes.containerImagem}>
      {imagem ? (
        <div
          style={{
            background: `linear-gradient(177.64deg, rgba(18, 18, 18, 0.2) 1.98%, rgba(18, 18, 18, 0.8) 98.3%), url(${imagem})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className={classes.imagemProduto}
        ></div>
      ) : (
        <img src={imagemVazia} alt="imagem vazia" width="150" heigth="150" />
      )}
      <label className={classes.labelImagem} htmlFor="file">
        <PublishIcon className={classes.upload} />
        <br />
        Clique ou arraste <br />
        para adicionar uma imagem
      </label>
      <input
        className={classes.inputImagem}
        onChange={(e) => uploadImagem(e)}
        type="file"
        id="file"
      />
    </div>
  );
}
