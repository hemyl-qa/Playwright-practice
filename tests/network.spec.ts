import test, { expect } from "@playwright/test";
import HomePage from "./POM/HomePage";
import SignInForm from "./POM/SignInForm";
import { request } from '@playwright/test';

test.describe(('Mocking'), async () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    const email = 'hemyl.qa@gmail.com';
    const password = '.mbsVb5kV96FnTU';

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);

        await homePage.open();
        await signInForm.signInButton.click();
        await signInForm.loginWithCredentials(email, password);
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
      });

    test('Response body replacement', async ({page}) => {

        const fakeUserName = {
                "status": "ok",
                "data": {
                    "userId": 175494,
                    "photoFilename": "default-user.png",
                    "name": "Fake First Name",
                    "lastName": "Fake Last Name"
            }
        }

        await page.route('**/api/users/profile', async route => {
            await route.fulfill({
              status: 200,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(fakeUserName),
            });
          });

        await page.locator('.-profile').click();
        await expect(page.getByText('Fake First Name')).toBeVisible();
        await expect(page.getByText('Fake Last Name')).toBeVisible();

    })

} )


test.describe(('Added car'), async () => {
    const email = 'hemyl.qa@gmail.com';
    const password = '.mbsVb5kV96FnTU';
    let globalAuthHeader: string;

    test.beforeAll(async ({ request }) => {
        const responseAuth = await request.post('/api/auth/signin', {
            data: {
                     "email": email,
                    "password": password,
                    "remember": false
                  }
            })

            globalAuthHeader = responseAuth.headers()['set-cookie'].split(';')[0];

            expect(globalAuthHeader).toBeDefined();

        });
      

    test('Added car positive', async ({request}) => {

        const requestAddedCar = await request.post('https://qauto.forstudy.space/api/cars', {
            headers: {
              'Cookie': globalAuthHeader
            },
            data: {
              "carBrandId": 4,
              "carModelId": 16,
              "mileage": 145
            }
          });

          const requestAddedCarJSON = await requestAddedCar.json();

          expect(requestAddedCar.status()).toBe(201);
          expect(requestAddedCarJSON.status).toBe('ok');
          expect(requestAddedCarJSON.data.carBrandId).toBe(4);
          expect(requestAddedCarJSON.data.carModelId).toBe(16);
          console.log(await requestAddedCar.json());

        })

        test('Added car: invalid brand', async ({request}) => {

          const requestAddedCar = await request.post('https://qauto.forstudy.space/api/cars', {
              headers: {
                'Cookie': globalAuthHeader
              },
              data: {
                "carBrandId": 42,
                "carModelId": 1,
                "mileage": 145
              }
            });
  
            const requestAddedCarJSON = await requestAddedCar.json();
  
            expect(requestAddedCar.status()).toBe(404);
            expect(requestAddedCarJSON.status).toBe('error');
            expect(requestAddedCarJSON.message).toBe('Brand not found');
            console.log(await requestAddedCar.json());
  
          })

        test('Added car: car brand id is required', async ({request}) => {

          const requestAddedCar = await request.post('https://qauto.forstudy.space/api/cars', {
              headers: {
                  'Cookie': globalAuthHeader
              },
              data: {
                  "carModelId": 16,
                  "mileage": 145,
                  }
                });
      
              const requestAddedCarJSON = await requestAddedCar.json();
      
              expect(requestAddedCar.status()).toBe(400);
              expect(requestAddedCarJSON.status).toBe('error');
              expect(requestAddedCarJSON.message).toBe('Car brand id is required');
              console.log(await requestAddedCar.json());
      
          })

        test('Added car: invalid model', async ({request}) => {

            const requestAddedCar = await request.post('https://qauto.forstudy.space/api/cars', {
                headers: {
                  'Cookie': globalAuthHeader
                },
                data: {
                  "carBrandId": 4,
                  "carModelId": 1,
                  "mileage": 145
                }
              });
    
              const requestAddedCarJSON = await requestAddedCar.json();
    
              expect(requestAddedCar.status()).toBe(404);
              expect(requestAddedCarJSON.status).toBe('error');
              expect(requestAddedCarJSON.message).toBe('Model not found');
              console.log(await requestAddedCar.json());
    
            })

        test('Added car: car model id is required', async ({request}) => {

            const requestAddedCar = await request.post('https://qauto.forstudy.space/api/cars', {
                headers: {
                    'Cookie': globalAuthHeader
                },
                data: {
                    "carBrandId": 1,
                    "mileage": 145,
                    }
                  });
        
                const requestAddedCarJSON = await requestAddedCar.json();
        
                expect(requestAddedCar.status()).toBe(400);
                expect(requestAddedCarJSON.status).toBe('error');
                expect(requestAddedCarJSON.message).toBe('Car model id is required');
                console.log(await requestAddedCar.json());
        
            })

            test('Added car: invalid mileage', async ({request}) => {

              const requestAddedCar = await request.post('https://qauto.forstudy.space/api/cars', {
                  headers: {
                      'Cookie': globalAuthHeader
                  },
                  data: {
                      "carBrandId": 1,
                      "carModelId": 1,
                  }
                    });
          
                  const requestAddedCarJSON = await requestAddedCar.json();
          
                expect(requestAddedCar.status()).toBe(400);
                expect(requestAddedCarJSON.status).toBe('error');
                expect(requestAddedCarJSON.message).toBe('Mileage is required');
              })

            test('Added car: mileage is required', async ({request}) => {

                const requestAddedCar = await request.post('https://qauto.forstudy.space/api/cars', {
                    headers: {
                        'Cookie': globalAuthHeader
                    },
                    data: {
                        "carBrandId": 1,
                        "carModelId": 1,
                    }
                      });
            
                    const requestAddedCarJSON = await requestAddedCar.json();
            
                  expect(requestAddedCar.status()).toBe(400);
                  expect(requestAddedCarJSON.status).toBe('error');
                  expect(requestAddedCarJSON.message).toBe('Mileage is required');
                })

    })
