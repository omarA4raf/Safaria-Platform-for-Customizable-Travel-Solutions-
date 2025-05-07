import requests
import json
from random import choice
import os

# List of countries for which we are sending the requests
countries = ["China", "France", "Italy", "Germany", "Japan", "USA", "Australia", "Brazil", "India", "South Africa"]

# URL of the Spring Boot endpoint
url = 'http://localhost:8080/api/tours/create'  # Replace with your actual endpoint URL

# Function to generate fake images for testing, using relative path
def generate_fake_image(country):
    # Replace 'images/{country}/{country}_image.jpg' with your relative image path
    image_path = f'./images/{country}.jpg'
    
    # Check if the image exists
    if os.path.exists(image_path):
        return (f'image_{country}.jpg', open(image_path, 'rb'))
    else:
        raise FileNotFoundError(f"Image for {country} not found at {image_path}")

# Loop to send 10 requests per country
for country in countries:
    for i in range(10):
        # Constructing the tourData JSON
        tour_data = {
            "title": f"Explore the Great Wall of {country}",
            "description": f"A guided tour to one of the most iconic landmarks in the world, located in {country}.",
            "destinationCountry": country,
            "tourProviderId": 123,
            "currency": "USD",
            "tourismTypes": ["Historical", "Adventure", "Cultural"],
            "availableDates": [
                {
                    "price": 299.99,
                    "startDate": "2025-06-01",
                    "endDate": "2025-06-07",
                    "availableSeats": 30
                },
                {
                    "price": 350.00,
                    "startDate": "2025-07-01",
                    "endDate": "2025-07-07",
                    "availableSeats": 25
                }
            ]
        }

        # Convert tourData to JSON string
        tour_data_json = json.dumps(tour_data)

        # Prepare image files for the request (for simplicity, we simulate with placeholder files)
        try:
            image_files = [generate_fake_image(country)]  # Try to fetch image for the country

            # Sending the POST request
            files = {
                'tourData': ('tourData.json', tour_data_json, 'application/json'),
                'images': image_files[0]
            }

            # Sending the request using the 'requests' library
            response = requests.post(url, files=files)
            if response.status_code == 200:
                print(f"Successfully sent request for {country} tour {i+1}")
            else:
                print(f"Failed to send request for {country} tour {i+1}: {response.status_code}")
        except FileNotFoundError as e:
            print(e)
        except Exception as e:
            print(f"Error sending request for {country} tour {i+1}: {str(e)}")
