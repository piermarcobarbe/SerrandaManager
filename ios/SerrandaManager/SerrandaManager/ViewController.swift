//
//  ViewController.swift
//  SerrandaManager
//
//  Created by Damiano Pugliesi on 09/04/2020.
//  Copyright © 2020 Damiano Pugliesi. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
   
    @IBOutlet var HomePage: UIView!
    @IBOutlet var btn_up: UIImageView!
    @IBOutlet var btn_down: UIImageView!
    
    let x = 148.0
    let x_max = 231.0
    
    let up_y = 204.5
    let up_y_max = 281.0
    
    let down_y = 326.0
    let down_y_max = 403.0
    
    let touch_min_force = 0.05
    let touch_standard_force = 0.5
    
    var standard_force = true
    var max_force = false
    
    var up = false
    var down = false
    
    var selected_zone = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        set_borders(imageView: btn_up)
        set_borders(imageView: btn_down)
        
    }
    
    func set_borders(imageView: UIImageView){
        imageView.layer.masksToBounds = true
        set_standard_border(imageView: imageView)
        imageView.layer.borderColor = UIColor.black.cgColor
    }
    
    func increase_border(imageView: UIImageView){
        imageView.layer.borderWidth = 3.0
    }
    
    func set_standard_border(imageView: UIImageView){
        imageView.layer.borderWidth = 1.5
    }

    func set_touch_tap(current_force: Double, max_possible_force: Double, btn: String){
        
        if btn == "up"{
            up = true
            down = false
        }
        
        if btn == "down"{
            down = true
            up = false
        }
        
        if current_force >= touch_min_force && current_force <= touch_standard_force {
             standard_force = true
             max_force = false
        }
                       
        if current_force >= max_possible_force {
            max_force = true
            standard_force = false
        }
    }
    
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        let touch = touches.first
        let location = touch?.location(in: HomePage)
        
        let location_x = Double(location?.x ?? 0)
        
        if location_x >= x && location_x <= x_max {
            
            let location_y = Double(location?.y ?? 0)
            let current_force = Double(touch?.force ?? 0)
            
            if location_y >= up_y && location_y <= up_y_max {
               set_touch_tap(current_force: current_force, max_possible_force: Double(touch?.maximumPossibleForce ?? 0), btn: "up")
            }
            
            if location_y >= down_y && location_y <= down_y_max {
                 set_touch_tap(current_force: current_force, max_possible_force: Double(touch?.maximumPossibleForce ?? 0), btn: "down")
            }
            selected_zone = false
        }
        else{
            selected_zone = true
            up = false
            down = false
        }
    }
    
    
    func stop_all(){
        btn_up.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1.0)
        btn_down.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1.0)
        set_standard_border(imageView: btn_up)
        set_standard_border(imageView: btn_down)
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        if selected_zone == true{
            stop_all()
        }
        
        if up == true {
            set_standard_border(imageView: btn_down)
            print("up")
            if max_force == true{
                print("\t 3d")
                increase_border(imageView: btn_up)
            }
            if standard_force == true {
                print("\t normal")
                set_standard_border(imageView: btn_up)
            }
            btn_up.backgroundColor = UIColor(red: 139/255, green: 195/255, blue: 74/255, alpha: 1.0)
            btn_down.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1.0)
        }
            
        if down == true{
            set_standard_border(imageView: btn_up)
            print("down")
            if max_force == true{
                print("\t 3d")
                increase_border(imageView: btn_down)
            }
            if standard_force == true {
                print("\t normal")
                set_standard_border(imageView: btn_down)
            }
            btn_down.backgroundColor = UIColor(red: 139/255, green: 195/255, blue: 74/255, alpha: 1.0)
            btn_up.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1.0)
        }
        
    }
    
    @IBAction func btnStop_TouchUpInside(_ sender: Any) {
        stop_all()
    }
    
}

