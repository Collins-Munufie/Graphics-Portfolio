provider "aws" {
  region = "us-east-2"
}

resource "aws_instance" "portfolio_server" {
  ami           = "ami-0f827ef562e9a5f6a"
  instance_type = "t2.micro"
  key_name      = "my-key-pair"

  security_groups = [aws_security_group.web_sg.name]

  tags = {
    Name = "portfolio-devops-server"
  }
}

resource "aws_security_group" "web_sg" {
  name = "portfolio-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
