from setuptools import setup, find_packages

setup(
    name='service',
    packages=find_packages(),
    install_requires=[
        'pyahocorasick',
        'grpcio-tools',
        'alephclient==0.6.5'
    ],
)
