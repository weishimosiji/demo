package com.example.administrator.myxutil;


import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.administrator.myxutil.annotation.ContentView;
import com.example.administrator.myxutil.annotation.OnClick;
import com.example.administrator.myxutil.annotation.ViewInject;

@ContentView(R.layout.activity_main)
public class MainActivity extends BaseActivity {
    @ViewInject(R.id.btn)
    Button btn;

    @OnClick(R.id.btn)
    public void clickBtn(View view){
        Button btn = null;
        Toast.makeText(this,"IOC得到了调用",Toast.LENGTH_LONG).show();
    }

}
