package com.example.administrator.qqzoneheader;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.RelativeLayout;
import android.widget.TextView;


import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        MyListView listView = (MyListView) findViewById(R.id.my_list);
//        View view = View.inflate(this,R.layout.header,null);

        final List<String> list = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            list.add(i+"");
        }
//        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,list);

//        adapter.add("string1");
//        adapter.add("haha");
//        adapter.add("heihei");
        BaseAdapter adapter = new BaseAdapter() {
            @Override
            public int getCount() {
                return list.size();
            }

            @Override
            public Object getItem(int i) {
                return null;
            }

            @Override
            public long getItemId(int i) {
                return i;
            }

            @Override
            public View getView(int i, View view, ViewGroup viewGroup) {
                if (view == null) {
                    view = new TextView(MainActivity.this);
                    TextView textView = (TextView) view;
                    textView.setText(list.get(i));
                }
                return view;
            }
        };
        View view = View.inflate(this, R.layout.header, null);
        ImageView imageView = (ImageView) view.findViewById(R.id.my_img);
        listView.setImageView(imageView);
        listView.addHeaderView(view);
        listView.setAdapter(adapter);
    }
}
