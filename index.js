const input = require("prompt-sync")();


// This class handles authentication
class Auth {
  users = []
  loggedInUser

  signUpAsCreator(fullName, email, password) {
    const newUser = new Creator(fullName, email, password)
    this.users.push(newUser);
    console.log("You've successfully signed us as a creator");
    return true
  }

  signUpAsStudent(fullName, email, password) {
    const newUser = new Student(fullName, email, password)
    this.users.push(newUser);
    console.log("You've successfully signed up as a student");
    return true
  }

  login(email, password) {
    const user = this.users.find(user => {
      if (user.email === email && user.password === password) return user
    })

    if (!user) return false
    this.loggedInUser = user
    return true
  }
}

/**
 * USER CLASSES
 * This has two child classes that inherit from it, creator class and student class
 * They are used in the Auth class to create new users
 */
class User {
  constructor(fullName, email, password) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }

  joinedSchool = new School("Learnable");
}

class Creator extends User {
  constructor(fullName, email, password) {
    super(fullName, email, password)
    this.role = "creator"
  }

  ownedSchool

  runCreatorMethods() {
    this.createSchool();
    this.ownedSchool.runSchoolMethods();
    // this.uploadLearningProduct()
  }

  createSchool() {
    console.log("=============================================")
    console.log("Create your school")
    const schoolName = input("Enter your school name: ");
    const school = new School(schoolName);
    this.ownedSchool = school
    console.log(`School created successfully. welcome to ${school.name}`);
  }
}

class Student extends User {
  constructor(fullName, email, password) {
    super(fullName, email, password)
    this.role = "student"
  }

  runStudentMethods() {
    console.log("Which track would you like to enroll in")
    console.log("1. Frontend");
    console.log("2. Backend");
    console.log("3. UI/UX");
    console.log("4. WEB3");

    const choice = parseInt(input("Enter either 1, 2, 3, or 4: "));
    if (isNaN(choice) || choice > 4 || choice < 1) return this.runStudentMethods();

    switch (choice) {
      case 1:
        console.log("You have successfully enrolled in frontend track!");
        break;

      case 2:
        console.log("You have successfully enrolled in backend track!");
        break;

      case 3:
        console.log("You have successfully enrolled in UI/UX track");
        break;

      case 4:
        console.log("You have successfully enrolled in WEB3 track");
        break;
    }
  }
}


/**
 * SCHOOL CLASS
 */
class School {
  constructor(name) {
    this.name = name
  }

  // if it's the default available school
  learningProducts = this.name === "Learnable" ? ["Frontend", "Backend", "Design"] : []
  enrolledStudents = []

  runSchoolMethods() {
    console.log("=============================================")
    console.log("What would you like to do?");
    console.log("1. Upload learning product");
    console.log("2. Enroll students");
    console.log("3. View learning products");
    console.log("4. View enrolled students");

    const choice = parseInt(input("Enter either 1, 2, 3 or 4: "))
    if (choice == NaN || choice > 4 || choice < 1)
      return this.runSchoolMethods()

    switch (choice) {
      case 1:
        this.uploadLearningProduct();
        break;
      
      case 2:
        this.enrollStudent()
        break;

      case 3:
        this.displayLearningProducts()
        break;
    
      default:
        this.displayEnrolledStudents()
        break;
    }

    this.nextStep()
  }

  nextStep() {
    console.log("=============================================")
    const choice = input("Would you like to do something else? Enter 'y' or 'n': ")

    switch (choice) {
      case "y":
        this.runSchoolMethods()
        break;

      case "n":
        console.log("See you later!");
        break;
    
      default:
        console.log("You have to enter either 'y' or 'n' ")
        this.nextStep()
        break;
    }
  }

  uploadLearningProduct() {
    console.log("=============================================")
    console.log("What kind of learning product would you like to provide for your students?");
    console.log("1. Course");
    console.log("2. Coaching");
    console.log("3. Digital download");
    console.log("4. Community");

    const productChoice = parseInt(input("Enter either 1, 2, 4 or 4: "));
    if (productChoice == NaN || productChoice > 4 || productChoice < 1)
      return this.uploadLearningProduct()

    switch (productChoice) {
      case 1:
        console.log("=============================================")
        const courseName = input("Enter course name: ");
        const course = new Course(courseName);
        this.learningProducts.push(course);
        console.log("Course uploaded successfully")
        break;

      case 2:
        console.log("=============================================")
        const coachingName = input("Enter coaching name: ");
        const coaching = new Coaching(coachingName);
        this.learningProducts.push(coaching);
        console.log("Coaching uploaded successfully")
        break;

      case 3:
        console.log("=============================================")
        const fileName = input("Enter file name: ");
        const file = new DigitalDownload(fileName);
        this.learningProducts.push(file);
        console.log("Downloadable file uploaded successfully")
        break;
    
      default:
        console.log("=============================================")
        const communityName = input("Enter community name: ");
        const community = new Community(communityName);
        this.learningProducts.push(community);
        console.log("Community uploaded successfully")
        break;
    }
  }

  enrollStudent() {
    console.log("=============================================")
    const studentName = input("Enter student's name: ");
    this.enrolledStudents.push(studentName);
    console.log("Successfuly enrolled student")
  }

  displayLearningProducts() {
    if (this.learningProducts.length === 0)
      return console.log("You have not uploaded any learning products")
    console.log(this.learningProducts)
  }

  displayEnrolledStudents() {
    if (this.enrolledStudents.length === 0)
      return console.log("You have not enrolled any students into your school")
    console.log(this.enrolledStudents)
  }
}


/**
 * LEARNING PRODUCT CLASS
 * This has four other classes that onherit from it because teachable has 
 * four different types of learning products including course, coaching,
 * digital download and community
 */
class LearningProduct {
  constructor(name) {
    this.name = name
  }
}

class Course extends LearningProduct {
  constructor(name) {
    super(name)
  }

  lessons = []
}

class Coaching extends LearningProduct {
  constructor(name) {
    super(name)
  }

  sessions = []
}

class DigitalDownload extends LearningProduct {
  constructor(name) {
    super(name)
  }

  downloadableContent = []
}

class Community extends LearningProduct {
  constructor(name) {
    super(name)
  }

  members = []
  moderator = ""
}

class Teachable {
  loggedInUser

  auth = new Auth();

  startApp() {
    console.log("Hello, Welome to Teachable");
    const success = this.handleSignup();
    const loggedInUser = this.handleSignin();

    // run creator or student functionality based on role of loggedInUser
    if (loggedInUser.role === "creator") return loggedInUser.runCreatorMethods()

    return loggedInUser.runStudentMethods()
  }

  // get input details for user sign up
  getInput() {
    const fullName = input("Enter your full name: ")
    const email = input("Enter your email address: ")
    const password = input("Enter your password: ")

    return {fullName, email, password}
  }

  // choose between signup as a creator or student
  handleSignup() {
    console.log("Create your account");
    console.log("1. Creator Account");
    console.log("2. Student Account");

    const choice = parseInt(input("Input either 1 or 2: "));
    if (choice == NaN || choice > 2 || choice < 1)
      return this.handleSignup()

    if (choice === 1) {
      const { fullName, email, password } = this.getInput()
      return this.auth.signUpAsCreator(fullName, email, password)
    }

    if (choice === 2) {
      const { fullName, email, password } = this.getInput()
      return this.auth.signUpAsStudent(fullName, email, password)
    }

  }

  // sign in to account
  handleSignin() {
    console.log("=============================================")
    console.log("Please login to your account")
    const email = input("Email: ");
    const password = input("Password: ");
    const success = this.auth.login(email, password);

    // if failed login then re-run login function
    if (success === false) {
      console.log("Invalid email or password");
      return this.handleSignin();
    }

    console.log(`Welcome ${this.auth.loggedInUser.fullName}, login sucessful!`);
    return this.auth.loggedInUser
  }
}

const teachable = new Teachable();
teachable.startApp();