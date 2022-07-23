import { StyleSheet } from 'react-native';
import cores from './cores';

const Estilo = StyleSheet.create({
    ContainerGeral: {
        margin: 10,
        flex: 1,
        alignItems: 'stretch',
        height: '100%',
    },
    ConteinerCenter: {
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',

    },
    //Texto comum
    TxtComum: {
        color: cores.corTextoGeral,
    },

    //Título nível 1 
    H1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: cores.corTextoGeral,
    },
    //Título nível 2
    H2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: cores.corFontsDetalhes,
    },
    //Título nível 3
    H3: {
        fontSize: 15,
        fontWeight: 'bold',
        color: cores.corFontsDetalhes,
    },
    //Centraliza Itens
    ItemCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    //Configuração dos inputs
    tituloInput: {
        fontSize: 14,
    },
    boxInputText: {
        borderWidth: 1,
        borderColor: cores.bordasLinhas,
        borderRadius: 7,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        color: cores.corTextoGeral,
    },
    boxInputFile: {
        borderWidth: 1,
        borderColor: cores.bordasLinhas,
        borderRadius: 7,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#4E5063',
        alignItems: 'center',
    },
    boxNeutro: {
        marginTop: 10,
        marginBottom: 10,
    },

    //Configurar lista de itens com botões
    boxLista: {

    },
    linhaLista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: cores.bordasLinhas,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    txtLista: {
        color: cores.corTextoGeral,
    },
    txtLinkPositivo: {
        color: cores.corFontDestaque,
        textDecorationLine: 'underline',
    },
    txtLinkNegativo: {
        color: '#CF565F',
        textDecorationLine: 'underline',
    },
    boxBotaoLista: {
        flexDirection: 'row',
    },
    boxTextoLista: {
        flexWrap: 'wrap',
    },
    btnLista: {
        alignItems: 'flex-end',
        marginLeft: 10,
        paddingLeft: 10,
        marginRight: 10,
    },

    /* Modal Style */
    modalContainer: {
        backgroundColor: '#000',
        flex: 1,
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        elevation: 5,
        margin: 20,
        backgroundColor: cores.fundoApp,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'stretch',
    },
    modalContainerTitulo: {
        flexDirection: 'row',
        borderBottomColor: cores.bordasLinhas,
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    modalTxtTitulo: {
        color: cores.corFontDestaque,
        fontWeight: 'bold',
    },
    modalBtnClose: {
        backgroundColor: cores.primaria,
        padding: 0,
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
    },
    modalTxtBtnClose: {
        color: cores.corTextoGeral,
    },

    /* Estilo das imagem dos pratos */
    fotoPratoUpload: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#fff',
        elevation:5,
    },
    fotoPratoEdit: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
    },
    fotoPratoLista: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },


});

export default Estilo;