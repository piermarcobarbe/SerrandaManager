//
//  ViewController.swift
//  SerrandaManager
//
//  Created by Damiano Pugliesi on 09/04/2020.
//  Copyright © 2020 Damiano Pugliesi. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {
   
    @IBOutlet var HomePage: UIView!
    @IBOutlet var btn_up: UIImageView!
    @IBOutlet var btn_down: UIImageView!
    @IBOutlet var windowTab: UISegmentedControl!
    
    let x = 99.0
    let x_max = 276.0
    
    let up_y = 142.0
    let up_y_max = 276.0
    
    let down_y = 320.0
    let down_y_max = 454.0
    
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
//        set_borders(imageView: btn_up)
//        set_borders(imageView: btn_down)
        
    }
    
    func get_window_tab_selected() -> Int{
        return windowTab.selectedSegmentIndex
    }
    
    func remove_border(imageView: UIImageView){
        imageView.layer.borderWidth = 0.0
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
        remove_border(imageView: btn_up)
        remove_border(imageView: btn_down)
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        if selected_zone == true{
            stop_all()
        }
        
        let index = get_window_tab_selected()
        if up == true {
            set_button(valid: btn_up, not_valid: btn_down)
            if max_force == true{
                up_all()
            }
            else{
                btn_up_click(index: index)
            }
        }
            
        if down == true{
           set_button(valid: btn_down, not_valid: btn_up)
            if max_force == true{
                down_all()
            }
            else{
                btn_down_click(index: index)
            }
        }
        
    }
    
    func up_all(){
        let url = "http://192.168.1.22:3000/buttons/all/status/up"
        Alamofire.request(url).responseJSON(completionHandler: {response in
            print(response)
        })
    }
    
    func down_all(){
        let url = "http://192.168.1.22:3000/buttons/all/status/down"
        Alamofire.request(url).responseJSON(completionHandler: {response in
            print(response)
        })
    }
    
    func btn_up_click(index: Int){
        let url = "http://192.168.1.22:3000/buttons/\(index)/status/up"
        Alamofire.request(url).responseJSON(completionHandler: {response in
            print(response)
        })
    }
    
    func btn_down_click(index: Int){
        let url = "http://192.168.1.22:3000/buttons/\(index)/status/down"
        Alamofire.request(url).responseJSON(completionHandler: {response in
            print(response)
        })
    }
    
    func set_button(valid: UIImageView, not_valid: UIImageView){
        remove_border(imageView: not_valid)
        if max_force == true{
            increase_border(imageView: valid)
        }
        if standard_force == true {
            set_standard_border(imageView: valid)
        }
    }
    
    @IBAction func btnStop_TouchUpInside(_ sender: Any) {
        stop_all()
        
        let url = "http://192.168.1.22:3000/buttons/all/status/stop"
       
        Alamofire.request(url).responseJSON(completionHandler: {(response) in
                       print(response) })
    }
    
}

