# Launch the backend
1. initialize the virtual environment
2. cd to this directory
3. run `uvicorn app.main:app --host 0.0.0.0 --port 5050 --reload`
4. test its running with swagger url: `http://127.0.0.1:5050/docs`