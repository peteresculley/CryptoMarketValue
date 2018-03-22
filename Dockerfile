# Use the official Python 3 runtime as a parent image
FROM python:3

# Copy the current directory contents into the container at /app
ADD . /app

# Set the working directory to /app
WORKDIR /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Run app.py when the container launches
ENTRYPOINT ["python", "app.py"]