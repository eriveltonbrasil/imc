import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Topo } from './components/Topo';
import { Resultado } from './components/Resultado';

export default function App() {
    const [peso, setPeso] = useState<string>("");
    const [altura, setAltura] = useState<string>("");
    const [imc, setIMC] = useState<number | null>(null);
    const [classificacao, setClassificacao] = useState<string | null>(null);
    
    // 1. Estado para armazenar a mensagem de erro
    const [erro, setErro] = useState<string>("");

    // 2. Função solicitada na atividade
    function validarCampos() {
        if (peso.trim() === "" || altura.trim() === "") {
            setErro("Preencha o peso e a altura");
            return; // Para a execução aqui e não calcula
        }
        
        // Se passou da verificação, limpa o erro e calcula
        setErro(""); 
        calcularIMC();
    }

    function calcularIMC(){
        // Substituindo a vírgula por ponto para não dar erro no cálculo
        let pesoCorrigido = peso.replace(',', '.');
        let alturaCorrigida = altura.replace(',', '.');

        let imcCalculado = parseFloat(pesoCorrigido) / (parseFloat(alturaCorrigida)*parseFloat(alturaCorrigida));
        
        setIMC(imcCalculado);
        
        if(imcCalculado < 18.5){
            setClassificacao("Abaixo do peso");
        }else if(imcCalculado < 25){
            setClassificacao("Peso normal");
        }else if(imcCalculado < 30){
            setClassificacao("Sobrepeso");
        }else{
            setClassificacao("Obeso");
        }
    }
    
    return (
        <View style={styles.container}>
            <Topo/>

            <View style={styles.form}>
                
                {/* 3. Caixa de alerta que só aparece se houver um erro */}
                {erro !== "" && (
                    <View style={styles.alerta}>
                        <Text style={styles.alertaTexto}>{erro}</Text>
                    </View>
                )}

                <Text style={styles.label}>Peso</Text>
                <TextInput style={styles.input} onChangeText={setPeso} keyboardType="numeric"></TextInput>
                
                <Text style={styles.label}>Altura</Text>
                <TextInput style={styles.input} onChangeText={setAltura} keyboardType="numeric"></TextInput>

                {/* 4. Trocamos a função chamada no botão para validarCampos */}
                <TouchableOpacity style={styles.btn} onPress={validarCampos}>
                    <Text style={styles.btnText}>Calcular</Text>
                </TouchableOpacity>

                
                <Resultado resultadoIMC={imc}/>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06C',
    },
    form: {
        backgroundColor: '#FFF',
        height: '100%',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        padding: 30
    },
    // 5. Estilos para a caixa vermelha de erro
    alerta: {
        backgroundColor: '#DC3545', // Cor vermelha parecida com a do exercício
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    alertaTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        fontSize: 22,
        marginBottom: 10
    },
    input: {
        backgroundColor: '#DDD',
        borderRadius: 10,
        fontSize: 22,
        padding: 10,
        height: 60,
        marginBottom: 20
    },
    btn: {
        backgroundColor: '#F90',
        padding: 15,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    btnText: {
        color: '#FFF',
        fontSize: 22
    },
});