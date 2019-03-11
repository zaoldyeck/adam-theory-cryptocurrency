meteor build .deploy --architecture os.linux.x86_64
docker build -t zaoldyeck/adam-theory-cryptocurrency:latest .
# docker run -t -i -p 3000:3000 zaoldyeck/adam-theory-cryptocurrency:latest
docker tag zaoldyeck/adam-theory-cryptocurrency:latest gcr.io/stock-value-investor/zaoldyeck/adam-theory-cryptocurrency:latest
# gcloud auth configure-docker
hash=`docker push gcr.io/stock-value-investor/zaoldyeck/adam-theory-cryptocurrency:latest | grep "latest" | awk '{print $3}'`
# gcloud container clusters get-credentials adam-theory-cryptocurrency --zone asia-east1-a --project stock-value-investor

# For first time
kubectl run adam-theory-cryptocurrency --image gcr.io/stock-value-investor/zaoldyeck/adam-theory-cryptocurrency@${hash} --port 3000 --replicas=2
kubectl expose deployment adam-theory-cryptocurrency --target-port=3000 --type=NodePort
kubectl apply -f ingress.yaml
kubectl get ingress adam-theory-cryptocurrency

# For update
#kubectl scale deployment adam-theory-cryptocurrency --replicas=2
#kubectl set image deployment/adam-theory-cryptocurrency adam-theory-cryptocurrency=gcr.io/stock-value-investor/zaoldyeck/adam-theory-cryptocurrency@${hash}