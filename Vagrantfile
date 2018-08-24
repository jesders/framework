# -*- mode: ruby -*-
# vi: set ft=ruby :
# Created by: Deac Karns
VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "sfp-aws-ubuntu"
  config.vm.box_url = "http://dash.sfp.cc/sfp-aws-ubuntu.box"

  # Prevent "Inappropriate ioctl for device" message
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
  config.vm.define :shoups do |shoups|
  end
  config.vm.network :forwarded_port, host: 8099, guest: 80
  config.vm.network :forwarded_port, host: 3399, guest: 3306
  
  config.vm.synced_folder "./", "/var/www/html", owner: "vagrant", group: "vagrant", mount_options: ["dmode=777", "fmode=777"]

  config.vm.provider "virtualbox" do |v|
    v.customize [ "modifyvm", :id, "--uartmode1", "disconnected" ]
  end
end

