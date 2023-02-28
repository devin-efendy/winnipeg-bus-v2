# Insert Transit Schedules

Create a virtual environment

```bash
virtualenv --python=python3.9 .transitenv
```

Activate virtual environment

```bash
source .transitenv/bin/activate
```

Install Dependencies

```bash
pip3 install -r requirements.txt
```

# Deployment

Install dependencies into `package` directory

```bash
pip3 install --platform manylinux2014_x86_64 --target ./package --implementation cp --python 3.9 --only-binary=:all: --upgrade -r requirements.txt

cd package; zip -r ../insertSchedules.zip .; cd ../
```

Add handler to the zip

```
zip insertSchedules.zip app.py
```
