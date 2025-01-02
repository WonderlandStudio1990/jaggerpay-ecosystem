#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}Error: Docker is not running${NC}"
        exit 1
    fi
}

# Function to start the monitoring stack
start() {
    echo -e "${GREEN}Starting WonderPay monitoring stack...${NC}"
    docker-compose up -d
    echo -e "${GREEN}Monitoring stack is running:${NC}"
    echo "- Graphite: http://localhost:2003"
    echo "- Grafana: http://localhost:3005 (admin/wonderpay)"
    echo "- StatsD: UDP port 8125"
}

# Function to stop the monitoring stack
stop() {
    echo -e "${GREEN}Stopping WonderPay monitoring stack...${NC}"
    docker-compose down
}

# Function to show status
status() {
    echo -e "${GREEN}Monitoring stack status:${NC}"
    docker-compose ps
}

# Function to show logs
logs() {
    echo -e "${GREEN}Monitoring stack logs:${NC}"
    docker-compose logs --tail=100 -f
}

# Function to restart the stack
restart() {
    stop
    start
}

# Check if Docker is running
check_docker

# Parse command line arguments
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    logs)
        logs
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        exit 1
        ;;
esac

exit 0 