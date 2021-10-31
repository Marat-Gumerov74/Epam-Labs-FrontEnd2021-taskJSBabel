import './style.scss'

const start = 'start'
console.log(start)

class Hello {
  constructor() {
    this.start2 = "start2"
  }

  output = () => {
    console.log(this.start2)
  }
}

const hello = new Hello()
hello.output()