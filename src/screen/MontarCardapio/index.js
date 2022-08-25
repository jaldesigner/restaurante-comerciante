import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Estilo from '../../Style/Estilo';
import { Card, Btn2, Btn1 } from '../../components';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { CTX_SelecaoPrato } from '../../contexts';
import INF from '../../config/';
import { MoedaReal } from '../../functions/mascaras';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Adicionar } from '../../functions/cadastroGeral';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export default function MontarCardapio({ navigation }) {
	const [ctxSelecaoPrato, setCtxSelecaoPrato] = useContext(CTX_SelecaoPrato);
	const [prato, setPratos] = useState([]);
	const [valores, setValores] = useState([]);
	const [medidas, setMedidas] = useState([]);
	const [cardapioDoDia, setCardapioDoDia] = useState([]);
	const [acompanhamento, setAcampanhamento] = useState([]);
	const [arrayValores, setArrayValores] = useState([]);
	const [arrayValoresMedidas, setArrayValoresMedidas] = useState([]);
	const [selecaoPickerPrato, setSelecaoPickerPrato] = useState('');
	const [selecaoPickerAcompanhamento, setSelecaoPickerAcompanhamento] = useState('');
	const [atualiza, setAtualiza] = useState(0);

	const dataDeHoje = () => {
		const hoje = new Date();
		const dia = hoje.getDate().toString().padStart(2, '0');
		const mes = String(hoje.getMonth() + 1).padStart(2, '0');
		const ano = hoje.getFullYear();
		const dataAtual = `${dia}-${mes}-${ano}`;

		return dataAtual;
	}

	useEffect(() => {
		const listaPratos = async () => {
			const l = await pathDb.collection('Pratos').orderBy('nome_prato').get();
			setPratos(l.docs);
		};
		const listaValores = async () => {
			const l = await pathDb.collection('Valores').orderBy('valor').get();
			setValores(l.docs);
		};
		const listaMedidas = async () => {
			const l = await pathDb.collection('Medidas').orderBy('medida').get();
			setMedidas(l.docs);
		};
		const listaAcompanhamentos = async () => {
			const l = await pathDb
				.collection('Acompanhamento')
				.orderBy('acompanhamento')
				.get();
			setAcampanhamento(l.docs);
		};

		const listaCardapioDoDia = async () => {
			const l = await pathDb.collection('CardapioDoDia').orderBy('cardapio').get();
			setCardapioDoDia(l.docs.map((item, index) => {
				return item.data();
			}));
		};

		listaCardapioDoDia();
		listaAcompanhamentos();
		listaMedidas();
		listaValores();
		listaPratos();
		setAtualiza(0);
	}, [atualiza]);

	//console.log(cardapioDoDia);

	const ValorPickerPratos = () => {
		const lp = prato.map((prato, index) => {
			return (
				<Picker.Item
					key={index}
					label={prato.data().nome_prato}
					value={prato.data().nome_prato}
				/>
			);
		});

		return lp;
	};

	const ValorPickerAcompanhamento = () => {
		const lp = acompanhamento.map((acmp, index) => {
			return (
				<Picker.Item
					key={index}
					label={acmp.data().acompanhamento}
					value={acmp.data().acompanhamento}
				/>
			);
		});

		return lp;
	};

	const ValorPickerValores = () => {
		const lv = valores.map((valores, index) => {
			return (
				<Picker.Item
					key={index}
					label={MoedaReal(valores.data().valor)}
					value={valores.data().valor}
				/>
			);
		});

		return lv;
	};

	const PickerTamanhoValor = () => {
		const LTamanho = medidas.map((med, index) => {
			return (
				<View key={index} style={Estilo.boxNeutro}>
					<View style={Estilo.BoxRow}>
						<View style={Estilo.boxColunaSelecao1}>
							<Text style={Estilo.TxtComum}>{med.data().medida}</Text>
						</View>

						<View style={Estilo.boxColunaSelecao2}>
							<Picker
								mode="dropdown"
								dropdownIconColor="#2D2D3F"
								style={{ backgroundColor: '#fff' }}
								onValueChange={selecaoPickerValor => {

									arrayValores[index] = {
										medida: med.data().medida,
										valor: selecaoPickerValor,
										indice: index,
									};

									setArrayValoresMedidas(arrayValores);
									setAtualiza(1);
								}}
								selectedValue={
									arrayValores[index] != undefined
										? arrayValores[index].valor
										: 'Selecione o valor'
								}>
								<Picker.Item label="Selecione o valor" value='' />
								{ValorPickerValores()}
								<Picker.Item label="Desativar" value={null} />
							</Picker>
						</View>
					</View>
				</View>
			);
		});

		return LTamanho;
	};

	const Salvar = () => {

		const contaMedidas = medidas.length;
		const TestaValorVazio = arrayValoresMedidas.map(obj => {
			return obj.valor;
		});
		const RetornoTeste = TestaValorVazio.indexOf('');

		if (selecaoPickerPrato == '' || selecaoPickerAcompanhamento == '') {
			alert("Selecione o Prato e o acompanhamento!");
		} else if (arrayValoresMedidas.length < contaMedidas) {
			alert(`Selecione os valores para as "${contaMedidas}" medidas`);
		} else if (RetornoTeste != -1) {
			alert("Selecione um valor para cada medida ou selecione \"Desativar\"");
		} else {
			let obj = {
				ativo: true,
				prato: selecaoPickerPrato,
				acompanhamento: selecaoPickerAcompanhamento,
				tamanho_valor: arrayValoresMedidas,
			}

			ctxSelecaoPrato[ctxSelecaoPrato.length] = obj;

			setArrayValores([]);
			setSelecaoPickerAcompanhamento('')
			setSelecaoPickerPrato('');
			setAtualiza(1);
		}

	}

	function excluirItemLista(index) {

		Alert.alert(
			"Atenção!",
			"Deseja realmente excluir o item?",
			[
				{
					text: "Não", onPress: () => {
						//ctxSelecaoPrato.splice(index, 1);
						//setAtualiza(1);
						return null;
					},
					style: "cancel"
				},
				{
					text: "Sim",
					onPress: () => {
						ctxSelecaoPrato.splice(index, 1);
						setAtualiza(1);
					}
				}
			]
		);
	}

	function Mostrar() {
		const mst = ctxSelecaoPrato.map((item, index) => {
			const mapValor = item.tamanho_valor.map((i, ind) => {
				return (
					<View key={ind}>
						<Text style={Estilo.TxtComum}>{i.medida} = {i.valor}</Text>
					</View>
				);
			});
			return (
				<View key={index}>
					<View style={{ marginTop: 10, }}>
						<Text style={Estilo.H3}>Prato:</Text>
						<Text style={Estilo.TxtComum}>{item.prato}</Text>
					</View>
					<View style={{ marginTop: 10, }}>
						<Text style={Estilo.H3}>Acompanhamento:</Text>
						<Text style={Estilo.TxtComum}>{item.acompanhamento}</Text>
					</View>
					<View style={{ marginTop: 10, }}>
						<Text style={Estilo.H3}>Medida/Valor:</Text>
						{mapValor}
					</View>

					<View style={Estilo.boxBtnExcluir}>
						<TouchableOpacity onPress={() => excluirItemLista(index)} style={Estilo.btnExcluir}>
							<Text style={Estilo.TxtComum}>Excluir</Text>
						</TouchableOpacity>
					</View>

					<View style={Estilo.Dividir} />
				</View>
			);
		});
		return mst;
	}


	const MSGCardapioPublicado = ()=> {
		cardapioDoDia.map((item,index) => {
			let datas = item.dataPublicacao;
			let dataH = dataDeHoje();
			//console.log(item.dataPublicacao)

			/* while(datas === dataH){
				console.log(item.dataPublicacao);
			} */

		});
	}

	MSGCardapioPublicado();

	const BoxPublicarCardapio = () => {
		if (ctxSelecaoPrato.length != 0) {
			return (
				<View>
					<Card>
						{Mostrar()}
					</Card>
					<Card>
						<View style={{ marginBottom: 10 }}>
							<Text style={{ textAlign: 'center', color: '#fff' }}>
								Ao adicionar todos os pratos,
								clique no botão abaixo para
								publicar o cardápio do dia.
							</Text>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Btn2 txt="Publicar Cardápio" fncClique={() => {
								publicarCardapio();
							}} />
						</View>
					</Card>
				</View>
			);
		}
	};

	function publicarCardapio() {
		let idUnico = (+new Date).toString(36);
		let data = dataDeHoje();
		let cardapioDoDia = {
			dataPublicacao: data,
			ativo: true,
			cardapio: ctxSelecaoPrato,
		};
		Adicionar('CardapioDoDia', data, cardapioDoDia, 'Cardápio adicionado com sucesso!');
		setCtxSelecaoPrato([]);

	}

	return (
		<SafeAreaView>
			<ScrollView>

				<View>

					{/*MSGCardapioPublicado()*/}

				</View>

				<Card titulo="Montar Cardápio">
					<View>
						<View>
							<View>
								<View style={Estilo.boxNeutro}>
									<Text style={Estilo.TxtComum}>Selecione o prato</Text>
								</View>
								<Picker
									mode="dropdown"
									dropdownIconColor="#2D2D3F"
									style={{ backgroundColor: '#fff' }}

									selectedValue={selecaoPickerPrato}
									onValueChange={selecaoPickerPrato => {
										setSelecaoPickerPrato(selecaoPickerPrato);
									}}>
									<Picker.Item label="Nenhum" value="" />
									{ValorPickerPratos()}
								</Picker>

							</View>

							<View>
								<View style={Estilo.boxNeutro}>
									<Text style={Estilo.TxtComum}>
										Selecione o acompanhamento
									</Text>
								</View>
								<Picker
									mode="dropdown"
									dropdownIconColor="#2D2D3F"
									style={{ backgroundColor: '#fff' }}
									selectedValue={selecaoPickerAcompanhamento}
									onValueChange={selecaoPickerAcompanhamento => {
										setSelecaoPickerAcompanhamento(selecaoPickerAcompanhamento);
									}}
								>
									<Picker.Item label="Nenhum" value="" />
									{ValorPickerAcompanhamento()}
								</Picker>
							</View>

							<View style={Estilo.Dividir} />
							<View>
								<View style={Estilo.BoxRow}>
									<View style={Estilo.boxColunaSelecao1}>
										<Text style={Estilo.H2}>Tamanho:</Text>
									</View>
									<View style={Estilo.boxColunaSelecao2}>
										<Text style={Estilo.H2}>Valor:</Text>
									</View>
								</View>
								{PickerTamanhoValor()}
							</View>
						</View>
						<View style={Estilo.boxNeutro}>
							<Btn2
								txt="Adicionar"
								fncClique={() => {
									setArrayValoresMedidas(arrayValores);
									Salvar();
									setAtualiza(1);
									//navigation.navigate('Cadastro');
								}}
							/>
						</View>
					</View>
				</Card>
				<BoxPublicarCardapio />
			</ScrollView>
		</SafeAreaView>
	);
}
