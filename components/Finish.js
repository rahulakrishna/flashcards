/**
 * Created by rahul on 29/10/17.
 */
import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'

class Finish extends React.Component{
    static navigationOptions=({navigation})=>({
        title:'Quiz Done!'
    })
    state={
        percentage:0
    }
    componentDidMount(){
        this.setState({
            percentage:this.props.navigation.state.params.score/this.props.navigation.state.params.maximum * 100
        })
    }
    showCompliment=(percent)=>{
        if(percent<20){
            return 'You need to be better!'
        }
        if(percent<50){
            return 'You could be better!'
        }
        if(percent<80){
            return 'That was good!'
        }
        else{
            return 'Genius!'
        }
    }
    render(){
        console.log(this.props.navigation.state.params)
        return(
            <View style={styles.container}>
                <Text style={{fontSize:24,textAlign:'center'}}>Hello, {this.showCompliment(this.state.percentage)}</Text>
                <Text style={{textAlign:'center'}}> You have scored: </Text>
                <View style={styles.score}>
                    <Text style={{textAlign:'center',fontSize:64}}>{this.props.navigation.state.params.score} / {this.props.navigation.state.params.maximum}</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center'}}>That means you scored {this.state.percentage} %</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Quiz',{card:this.props.navigation.state.params.card})}
                    style={[styles.button,{backgroundColor:'green'}]}
                >
                    <Text style={styles.buttonText}>Start Over</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Deck',{card:this.props.navigation.state.params.card,count:this.props.navigation.state.params.count})}
                    style={[styles.button,{backgroundColor:'green'}]}
                >
                    <Text style={styles.buttonText}>Go to {this.props.navigation.state.params.card}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        padding:20
    },
    score:{

    },
    button:{
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    },
    buttonText:{
        color:'white'
    }
})

export default Finish