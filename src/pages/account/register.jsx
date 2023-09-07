import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from 'next/image';
import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className=''>
                <div className='flex justify-between pt-6 md:mb-[80px] sm:mb-[10px] md:mx-[70px] sm:mx-[20px] text-black'>
              <div>
    <Link legacyBehavior href='/'>
                <a>                
      <Image
        src="/images/logo.png"
        alt="Image compressor logo"
        width="50"
        height="56"
        className='nav-logo'
        priority
        style={{
          width: "70%",
          height: "auto",      
        }} 
        />              
                </a>
                </Link>
              </div>
              <div>
                <div className='flex justify-center md:space-x-16 sm:space-x-4 text-[16px] cursor-pointer'>
                  <Link legacyBehavior href='/'>
                  <a                   
                    className="text-black hover:border-[#3AA7E3] px-3 py-2  text-md font-medium"
                  >
                      Home
                  </a>
              </Link>
              <Link legacyBehavior href='/about'>
                  <a                   
                    className="text-black hover:border-[#3AA7E3] px-3 py-2  text-md font-medium"
                  >
                    About
                  </a>
              </Link>
              <Link legacyBehavior href='/account/login'>
                  <a                   
                    className="text-black hover:border-[#3AA7E3] px-3 py-2  text-md font-medium"
                  >
                    Login
                  </a>
              </Link>              
        </div>
              </div>
                </div>
                <div className='container'>
                      <div className='column1'>
                        <div>
                            <p className='text-[#2566EB] text-[38px] font-bold'>Compress Images</p>
                            <p className='text-[16px]'>Automatically compress images to minimize file size without <br/>degrading quality to an unacceptable level and speed up your website.</p>
                        </div>
      <div className='flex justify-center'>
              <a href='/'>
                <Image
              src="/images/panda.png"
              alt="logo"
              width={600}
              height={600}
              priority
            /></a>
          </div>             
                    </div>
                    <div className='column2'>
                        <div className='md:mx-[100px] sm:mx-[20px]'>
                            <div className='flex '>
        <div className='text-black'>
        <p className='lg:text-[40px] md:text-[31px] sm:text-[35px] font-bold text-[#2566EB]'>Welcome!</p>
        <p className='text-[14px]'>To sign up, please supply your details below.</p>
        </div> 
</div>
<div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link legacyBehavior href="/account/login" className="btn btn-link">Cancel</Link>
                    </form>
                            </div>
                            <div>
                            <p className='py-1 w-full text-center text-black'>
                Already have an account?
                <Link href='/account/login'>
                  <span className='text-[#2566EB] text-[14px] font-bold hover:text-primary px-1'>
                    Login
                  </span>
                </Link>
              </p>
            </div>
                        </div>
                </div>
                    </div>
                </div>
            
                </div>
        </Layout>
    );
}
