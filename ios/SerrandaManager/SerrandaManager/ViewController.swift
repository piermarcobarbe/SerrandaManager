//
//  ViewController.swift
//  SerrandaManager
//
//  Created by Damiano Pugliesi on 09/04/2020.
//  Copyright © 2020 Damiano Pugliesi. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet var side_picker: UISegmentedControl!
    
    @IBOutlet var all_toogle: UISwitch!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    func print_all(){
        if side_picker.selectedSegmentIndex == 0 {
            print("sinistra")
        }
        else if side_picker.selectedSegmentIndex == 1{
            print("centrale")
        }
        else if side_picker.selectedSegmentIndex == 2{
            print("destra")
        }
    }

    @IBAction func btnUp_Click(_ sender: Any) {
        if all_toogle.isOn {
            print("tutte")
        }
        else {
            print_all()
        }
        
    }
    
    @IBAction func btnDown_Click(_ sender: Any) {
        if all_toogle.isOn {
            print("tutte")
        }
        else {
            print_all()
        }
    }
}

