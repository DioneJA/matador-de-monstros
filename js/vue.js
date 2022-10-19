new Vue({
    el:'#app',
    data:{
        running:false,
        playerLife: 100,
        monsterLife: 100,
        damagePlayer:0,
        damageMonster:0,
        logs: []

    },
    methods:{
        startGame(){
            this.playerLife = 100,
            this.monsterLife = 100,
            this.logs.splice(0,this.logs.length),
            this.running = true
        },
        giveUp(){
            this.running = false
        },
        getRandom(min,max){
            const value = Math.round(Math.random() * (max-min) + min)
            return value
        },
        attack(special){
            const damage = this.getRandom(5,12)
            if(special){
                this.damagePlayer = damage
                this.playerLife -= this.damagePlayer
                this.damageMonster = this.getRandom(this.damagePlayer,12)
                this.monsterLife -= this.damageMonster
            }else{
                this.damageMonster = damage
                this.monsterLife -= this.damageMonster
                this.damagePlayer = this.getRandom(this.damagePlayer,12)
                this.playerLife -= this.damagePlayer
            }
            this.registerLog("Jogador atingiu monstro com " + this.damageMonster + ".","log-player")
            this.registerLog("Monstro atingiu jogador com " + this.damagePlayer + "." ,"log-monster")
        },
        heal(){
            const healValue = this.getRandom(5,12)
            const monsterAttack = this.getRandom(5,healValue)
            this.playerLife += (healValue)-monsterAttack
            this.registerLog("Jogador ganhou força de " + healValue + ".","log-player-heal")
            this.registerLog("Monstro atingiu jogador com " + monsterAttack + ".","log-monster")
        },
        registerLog(text, cls){
            this.logs.unshift({text,cls})
        }
    },
    watch:{
        playerLife(){
            if(this.playerLife<=0){
                this.playerLife = 0
                this.running = false
            }else if(this.playerLife>=100){
                this.playerLife=100
            }
        },
        monsterLife(){
            if(this.monsterLife<=0){
                this.monsterLife=0
                this.running=false
            }
        }
    }
})