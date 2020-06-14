class Parent {
    constructor(name) {
        this.name = name;
    }
    print() {
        console.log(this.name);
    }
}
class Child extends Parent{
    constructor(name,email){
        super(name);
        this.email=email
    }
    print(){
        super.print();
        console.log(this.email);
    }
}
const ch1=new Child("usman","usman@gmail.com");
Child.prototype.show=(value)=>{
    console.log(value);
}
ch1.print()
ch1.show('a')